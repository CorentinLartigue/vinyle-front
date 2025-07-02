// src/services/authService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface RegisterPayload {
  email: string;
  password: string;
  verifyPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  verifyEmailToken: string;
}

export interface ResendVerifyEmailPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ModifyPasswordPayload {
  resetPasswordToken: string;
  newPassword: string;
  verifyPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

class AuthService {
  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
    body?: any
  ): Promise<AuthResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
        }
        throw new Error(data.message || 'Une erreur est survenue');
      }

      return {
        success: true,
        message: data.message || 'Opération réussie',
        data: data.data,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
    }
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return this.makeRequest('register', 'POST', payload);
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return this.makeRequest('login', 'POST', payload);
  }

  async verifyEmail(payload: VerifyEmailPayload): Promise<AuthResponse> {
    return this.makeRequest('verify-email', 'POST', payload);
  }

  async resendVerifyEmail(payload: ResendVerifyEmailPayload): Promise<AuthResponse> {
    return this.makeRequest('resend-verify-email', 'POST', payload);
  }

  async resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse> {
    return this.makeRequest('reset-password', 'POST', payload);
  }

  async modifyPassword(payload: ModifyPasswordPayload): Promise<AuthResponse> {
    return this.makeRequest('modify-password', 'POST', payload);
  }

  async getProfile(): Promise<AuthResponse> {
    return this.makeRequest('profile', 'GET');
  }

  async refreshToken(): Promise<AuthResponse> {
    return this.makeRequest('refresh', 'POST');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();