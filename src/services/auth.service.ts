import api from '@/lib/axios';
import { LoginInput } from '@/lib/validations/auth';

export const authService = {
  login: async (credentials: LoginInput) => {
    const response = await api.post('/users/signin', credentials);
    return response.data;
  }
}
