import { Account } from '../store/accounts';
import { InstagramStats } from '../store/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v12.0';

export class InstagramService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getAccountStats(account: Account): Promise<InstagramStats> {
    try {
      // Get user's media
      const mediaResponse = await fetch(
        `${INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${this.accessToken}`
      );
      const mediaData = await mediaResponse.json();

      // Get user's profile
      const profileResponse = await fetch(
        `${INSTAGRAM_API_URL}/me?fields=id,username,account_type,media_count&access_token=${this.accessToken}`
      );
      const profileData = await profileResponse.json();

      // Calculate engagement rate
      const recentPosts = mediaData.data.slice(0, 5).map((post: any) => ({
        id: post.id,
        likes: post.likes_count || 0,
        comments: post.comments_count || 0,
        timestamp: post.timestamp,
        mediaUrl: post.media_url,
      }));

      const totalEngagement = recentPosts.reduce(
        (sum: number, post: any) => sum + post.likes + post.comments,
        0
      );
      const engagementRate = profileData.followers_count
        ? (totalEngagement / profileData.followers_count) * 100
        : 0;

      return {
        followers: profileData.followers_count || 0,
        following: profileData.follows_count || 0,
        posts: profileData.media_count || 0,
        engagementRate,
        recentPosts,
      };
    } catch (error) {
      console.error('Error fetching Instagram stats:', error);
      throw new Error('Failed to fetch Instagram stats');
    }
  }
} 