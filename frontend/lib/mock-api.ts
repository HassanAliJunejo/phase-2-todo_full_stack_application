// Mock API for development/fallback
export class MockApiClient {
  private tasks: any[] = [];

  async getTasks() {
    return this.tasks;
  }

  async createTask(task: any) {
    const newTask = { id: Date.now().toString(), ...task, completed: false };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, task: any) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...task };
      return this.tasks[index];
    }
    return null;
  }

  async deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return { success: true };
  }

  async login(email: string, password: string) {
    return { access_token: 'mock-token', token_type: 'bearer' };
  }

  async register(email: string, password: string, name: string) {
    return { access_token: 'mock-token', token_type: 'bearer' };
  }

  async getUserInfo() {
    return { id: '1', email: 'mock@example.com', name: 'Mock User' };
  }
}

export const mockApiClient = new MockApiClient();
