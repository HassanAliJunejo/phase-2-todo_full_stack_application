// frontend/lib/api.ts
import { mockApiClient } from './mock-api';

// Define the API client interface
interface ApiClientInterface {
  request: (endpoint: string, options?: RequestInit) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<any>;
  getUserInfo: () => Promise<any>;
  getTasks: () => Promise<any>;
  getTask: (id: string) => Promise<any>;
  createTask: (taskData: any) => Promise<any>;
  updateTask: (id: string, taskData: any) => Promise<any>;
  deleteTask: (id: string) => Promise<any>;
  clearCache: (key?: string) => void;
}

// Real API client implementation
class RealApiClient implements ApiClientInterface {
  private baseUrl: string;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor() {
    // Use environment variable or default to localhost:8000
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    this.cache = new Map();
  }

  /**
   * Generic request method for API calls
   */
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    // Set default headers
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('auth-token');
    if (token && !config.headers?.hasOwnProperty('Authorization')) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      // Handle server not accessible error
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('HTTP error! status: 401');
        }

        // Try to parse error response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // If we can't parse the error, use the status text
          errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      // If the server is not accessible, fall back to mock API
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Real backend not accessible, falling back to mock API');
        return this.fallbackToMock(endpoint, options);
      }
      throw error;
    }
  }

  // Fallback to mock API when real backend is not accessible
  private async fallbackToMock(endpoint: string, options: RequestInit) {
    // Map the request to the appropriate mock method
    if (endpoint === '/api/v1/auth/login' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      return mockApiClient.login(body.email, body.password);
    } else if (endpoint === '/api/v1/auth/register' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      return mockApiClient.register(body.email, body.password, body.name);
    } else if (endpoint === '/api/v1/auth/me') {
      return mockApiClient.getUserInfo();
    } else if (endpoint === '/api/v1/todos/' && options.method === 'GET') {
      return mockApiClient.getTasks();
    } else if (endpoint.startsWith('/api/v1/todos/') && options.method === 'DELETE') {
      const id = endpoint.split('/').pop();
      return mockApiClient.deleteTask(id!);
    } else if (endpoint === '/api/v1/todos/' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      return mockApiClient.createTask(body);
    } else if (endpoint.startsWith('/api/v1/todos/') && options.method === 'PUT') {
      const id = endpoint.split('/').slice(-1)[0];
      const body = JSON.parse(options.body as string);
      return mockApiClient.updateTask(id, body);
    } else {
      // For other endpoints, return a generic response
      return { message: 'Request handled by mock API' };
    }
  }

  /**
   * Login method
   */
  async login(email: string, password: string) {
    return this.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Register method
   */
  async register(email: string, password: string, name: string) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  /**
   * Get user info method
   */
  async getUserInfo() {
    return this.request('/api/v1/auth/me');
  }

  /**
   * Get all tasks method
   */
  async getTasks() {
    const cacheKey = 'tasks';
    const cached = this.cache.get(cacheKey);

    // Cache for 30 seconds
    if (cached && Date.now() - cached.timestamp < 30000) {
      return cached.data;
    }

    const data = await this.request('/api/v1/todos/');
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }

  /**
   * Get a specific task
   */
  async getTask(id: string) {
    return this.request(`/api/v1/todos/${id}`);
  }

  /**
   * Create a new task
   */
  async createTask(taskData: any) {
    // Clear tasks cache after creating a new task
    this.clearCache('tasks');
    return this.request('/api/v1/todos/', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  /**
   * Update a task
   */
  async updateTask(id: string, taskData: any) {
    // Clear tasks cache after updating a task
    this.clearCache('tasks');
    return this.request(`/api/v1/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string) {
    // Clear tasks cache after deleting a task
    this.clearCache('tasks');
    return this.request(`/api/v1/todos/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Clear cache method
   */
  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

// Create the appropriate API client instance based on availability
// For now, we'll use the real API client which has fallback logic
const apiClientInstance = new RealApiClient;

// Export the API client
export const apiClient = apiClientInstance;