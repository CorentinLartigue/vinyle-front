const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface OrderProduct {
  productName: string;
  price: number;
}

export interface Order {
  orderDate: string;
  products: OrderProduct[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data?: Order[];
}

class OrderService {
  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
  ): Promise<OrderResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'accept': '*/*'
      };

      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
        method,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      return {
        success: true,
        message: data.message || 'Opération réussie',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
    }
  }

  async getOrders(): Promise<OrderResponse> {
    return this.makeRequest('orders/me');
  }
}

export const orderService = new OrderService(); 