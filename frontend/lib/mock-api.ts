// Mock API for development/fallback
export class MockApiClient {
  async getTasks() {
    return [];
  }

  async createTask(task: any) {
    return { id: Date.now().toString(), ...task };
  }

  async updateTask(id: string, task: any) {
    return { id, ...task };
  }

  async deleteTask(id: string) {
    return { success: true };
  }

  async login(email: string, password: string) {
    return { token: 'mock-token', user: { email } };
  }

  async register(email: string, password: string) {
    return { token: 'mock-token', user: { email } };
  }
}

export const mockApiClient = new MockApiClient();
