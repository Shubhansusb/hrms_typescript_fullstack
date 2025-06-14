import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Leave } from '../types/leave';

interface LeaveState {
  leaves: Leave[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaveState = {
  leaves: [],
  loading: false,
  error: null,
};

export const fetchLeaves = createAsyncThunk(
  'leaves/fetchLeaves',
  async (isAdmin: boolean, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isAdmin ? '/api/leaves/admin' : '/api/leaves';
      const response = await axios.get(`http://localhost:5000${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaves');
    }
  }
);

export const applyLeave = createAsyncThunk(
  'leaves/applyLeave',
  async (leaveData: Omit<Leave, 'id' | 'employeeId' | 'status' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/leaves', leaveData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to apply leave');
    }
  }
);

export const updateLeaveStatus = createAsyncThunk(
  'leaves/updateLeaveStatus',
  async ({ id, status }: { id: string; status: Leave['status'] }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/leaves/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update leave status');
    }
  }
);

const leaveSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(applyLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves.push(action.payload);
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.leaves.findIndex((leave) => leave.id === action.payload.id);
        if (index !== -1) {
          state.leaves[index] = action.payload;
        }
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leaveSlice.reducer;