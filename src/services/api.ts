const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// Log da URL da API (apenas em dev para debug)
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = 'Erro na requisição';
      let errorDetails: any = null;

      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
        errorDetails = errorData;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      const error: ApiError = {
        message: errorMessage,
        status: response.status,
        details: errorDetails,
      };

      // Se for erro 401, remover token e redirecionar para login
      if (response.status === 401) {
        this.removeToken();
        // Só redireciona se não estiver na página de login
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }

      throw error;
    }

    // Se resposta for vazia (204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw {
          message: 'Tempo de requisição esgotado',
          status: 408,
        } as ApiError;
      }

      if (error.message && error.status !== undefined) {
        throw error;
      }

      throw {
        message: 'Erro de conexão com o servidor',
        status: 0,
      } as ApiError;
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw {
          message: 'Tempo de requisição esgotado',
          status: 408,
        } as ApiError;
      }

      if (error.message && error.status !== undefined) {
        throw error;
      }

      throw {
        message: 'Erro de conexão com o servidor',
        status: 0,
      } as ApiError;
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw {
          message: 'Tempo de requisição esgotado',
          status: 408,
        } as ApiError;
      }

      if (error.message && error.status !== undefined) {
        throw error;
      }

      throw {
        message: 'Erro de conexão com o servidor',
        status: 0,
      } as ApiError;
    }
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw {
          message: 'Tempo de requisição esgotado',
          status: 408,
        } as ApiError;
      }

      if (error.message && error.status !== undefined) {
        throw error;
      }

      throw {
        message: 'Erro de conexão com o servidor',
        status: 0,
      } as ApiError;
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw {
          message: 'Tempo de requisição esgotado',
          status: 408,
        } as ApiError;
      }

      if (error.message && error.status !== undefined) {
        throw error;
      }

      throw {
        message: 'Erro de conexão com o servidor',
        status: 0,
      } as ApiError;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;

