import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchArticles } from '../store/articlesSlice';

export const useArticles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.articles
  );

  useEffect(() => {
    if (articles.length === 0 && !loading) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles.length, loading]);

  return { articles, loading, error };
};
