import { createSlice, } from '@reduxjs/toolkit';
import type{PayloadAction } from '@reduxjs/toolkit';
import type { Employee } from '../models/employee';

interface AuthState {
  user: Employee | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; employee: Employee }>) {
      state.user = action.payload.employee;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    initializeAuth(state) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          state.user = { id: payload.id, email: payload.email, role: payload.role };
          state.token = token;
        } catch (error) {
          state.user = null;
          state.token = null;
          localStorage.removeItem('token');
        }
      }
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;