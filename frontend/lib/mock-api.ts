// Mock API client for when the backend is not available
// This allows the frontend to continue functioning with mock data

// Simple in-memory storage for mock data
let mockTasks = [
  { id: '1-' + Math.random().toString(36).substr(2, 9), title: 'Sample Task', description: 'This is a sample task', completed: false, createdAt: new Date().toISOString() },
  { id: '2-' + Math.random().toString(36).substr(2, 9), title: 'Another Task', description: 'This is another sample task', completed: true, createdAt: new Date().toISOString() }
];

let mockUser = { id: 1, email: 'user@example.com' };

class MockApiClient {
  private baseUrl: string = 'http://mock-api'; // Provide a mock base URL
  private userInfoCache: any = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    console.warn('Using mock API client - backend server is not accessible');
  }

  // Generic request method
  async request(endpoint: string, options: RequestInit = {}) {
    // Simulate a generic request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if this is an authenticated endpoint and if we have a token
        const requiresAuth = endpoint.includes('/me') || endpoint.includes('/todos');
        const hasToken = localStorage.getItem('auth-token');

        // If this is an auth-requiring endpoint and no token exists, return 401
        if (requiresAuth && !hasToken) {
          reject(new Error('HTTP error! status: 401'));
          return;
        }

        // Handle specific endpoints differently
        if (endpoint.includes('/logout')) {
          resolve({ message: 'Logged out successfully' });
        } else if (endpoint.includes('/me')) {
          // Return user info for the /me endpoint
          resolve(this.getUserInfo());
        } else {
          resolve({ message: 'Request processed by mock API' });
        }
      }, 300);
    });
  }

  // Authentication methods
  async login(email: string, password: string) {
    // Simulate login - always succeeds with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ access_token: 'mock-jwt-token', token_type: 'bearer' });
      }, 300);
    });
  }

  async register(email: string, password: string, name: string) {
    // Simulate registration - always succeeds with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ access_token: 'mock-jwt-token', token_type: 'bearer' });
      }, 300);
    });
  }

  async logout() {
    // Simulate logout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Logged out successfully' });
      }, 300);
    });
  }

  clearCache() {
    this.userInfoCache = null;
    this.cacheTimestamp = null;
  }

  async getUserInfo() {
    // Check if we have cached user info and it's still valid
    const now = Date.now();
    if (this.userInfoCache && this.cacheTimestamp &&
        (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return this.userInfoCache;
    }

    // Return mock user data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Cache the user info
        this.userInfoCache = mockUser;
        this.cacheTimestamp = now;
        resolve(mockUser);
      }, 300);
    });
  }

  // Task methods
  async getTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTasks);
      }, 300);
    });
  }

  async getTaskById(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = mockTasks.find(t => t.id === id);
        resolve(task || null);
      }, 300);
    });
  }

  async createTask(task: { title: string; description?: string; completed?: boolean }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a unique ID similar to how the backend would
        const newId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
        const newTask = {
          id: newId,
          title: task.title,
          description: task.description || '',
          completed: task.completed || false,
          createdAt: new Date().toISOString()
        };
        mockTasks.push(newTask);
        resolve(newTask);
      }, 300);
    });
  }

  async updateTask(id: string, task: { title?: string; description?: string; completed?: boolean }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          mockTasks[index] = { ...mockTasks[index], ...task, id }; // Ensure ID remains the same
          resolve(mockTasks[index]);
        } else {
          resolve(null);
        }
      }, 300);
    });
  }

  async deleteTask(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          mockTasks.splice(index, 1);
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }, 300);
    });
  }
}

export const mockApiClient = new MockApiClient();