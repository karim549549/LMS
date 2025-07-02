import { create } from 'zustand';
import { userApis } from '@/services/apis/userApi';
import type { User } from '@/types/user/user.types';

export type AuthState = {
  user: User | null;
  tokenExp: number | null;
  setUser: (user: User) => void;
  logout: () => void;
};

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

const scheduleRefresh = (exp: number) => {
  const refreshBefore = exp - 60_000; // 1 min before expiry
  const delay = refreshBefore - Date.now();
  if (delay > 0) {
    refreshTimeout = setTimeout(() => {
      refreshToken();
    }, delay);
  }
};

const clearScheduledRefresh = () => {
  if (refreshTimeout) clearTimeout(refreshTimeout);
  refreshTimeout = null;
};

const refreshToken = async () => {
  const { data, error } = await userApis.refresh();
  if (error || !data?.user) {
    useUserStore.getState().logout();
  } else {
    useUserStore.getState().setUser(data.user);
  }
};

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  tokenExp: null,
  setUser: (user) => {
    const exp = Date.now() + 14 * 60 * 1000; 
    set({ user, tokenExp: exp });
    scheduleRefresh(exp);
  },
  logout: () => {
    clearScheduledRefresh();
    set({ user: null, tokenExp: null });
  },
})); 