import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Article } from '../types/article';
import { articlesApi } from '../services/api';

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  searchKeywords: string;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  searchKeywords: '',
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const articles = await articlesApi.getArticles(100);
    return articles;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSearchKeywords: (state, action: PayloadAction<string>) => {
      state.searchKeywords = action.payload;
    },
    clearSearchKeywords: (state) => {
      state.searchKeywords = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export const { setSearchKeywords, clearSearchKeywords } = articlesSlice.actions;
export default articlesSlice.reducer;
