/* eslint-disable no-console */
import axios from 'axios';
import type { Article } from '../types/article';

const API_BASE_URL = 'https://api.spaceflightnewsapi.net/v4';

export const articlesApi = {
  getArticles: async (limit: number = 15): Promise<Article[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`, {
        params: { limit },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  getArticleById: async (id: number): Promise<Article> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },
};
