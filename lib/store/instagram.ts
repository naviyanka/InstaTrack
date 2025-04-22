import { create } from 'zustand';
import { Account } from './accounts';
import { InstagramService } from '../services/instagram';
import { useAccountsStore } from './accounts';

export interface InstagramStats {
  followers: number;
  following: number;
  posts: number;
  engagementRate: number;
  recentPosts: {
    id: string;
    likes: number;
    comments: number;
    timestamp: string;
    mediaUrl: string;
  }[];
}

interface InstagramState {
  stats: Record<string, InstagramStats>;
  isLoading: boolean;
  error: string | null;
  fetchAccountStats: (account: Account) => Promise<void>;
  refreshAllStats: () => Promise<void>;
}

// TODO: Replace with your actual Instagram access token
const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || '';

const instagramService = new InstagramService(INSTAGRAM_ACCESS_TOKEN);

export const useInstagramStore = create<InstagramState>((set) => ({
  stats: {},
  isLoading: false,
  error: null,
  fetchAccountStats: async (account) => {
    set({ isLoading: true, error: null });
    try {
      const stats = await instagramService.getAccountStats(account);
      set((state) => ({
        stats: { ...state.stats, [account.id]: stats },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch Instagram stats', isLoading: false });
    }
  },
  refreshAllStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const accounts = useAccountsStore.getState().accounts;
      const statsPromises = accounts.map((account: Account) =>
        instagramService.getAccountStats(account)
      );
      const statsResults = await Promise.all(statsPromises);
      
      const newStats = accounts.reduce((acc: Record<string, InstagramStats>, account: Account, index: number) => {
        acc[account.id] = statsResults[index];
        return acc;
      }, {} as Record<string, InstagramStats>);

      set({ stats: newStats, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to refresh stats', isLoading: false });
    }
  },
})); 