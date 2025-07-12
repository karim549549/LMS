import { create } from 'zustand';
import { userApis } from '@/services/apis/userApi';
import type { User } from '@/types/user/user.types';
export type AuthState = {
  user: User | null;
  tokenExp: number | null;
  setUser: (user: User) => void;
  logout: () => void;
  registerUser: ()=>Promise<boolean>;
  hasRole : (roles : string[]) => boolean
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

export const useUserStore = create<AuthState>((set , get) => ({
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
  registerUser: async ()=> {
    const  { data ,error } = await userApis.me();
    if(data?.user){
      get().setUser(data.user)
      return true;
    }
    if(error){
      const  { data: refreshData} =  await  userApis.refresh();
      if(refreshData?.user){
        get().setUser(refreshData.user);
        return true
      } 
    }
    get().logout();
    return false;
  },
  hasRole:(roles ) =>{
    const user  = get().user;
    return  !!user  &&  roles.includes(user.role);
  }
})); 