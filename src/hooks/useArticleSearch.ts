import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { SearchResult } from '../types/article';
import { searchArticles } from '../utils/searchUtils';

export const useArticleSearch = (): SearchResult[] => {
  const { articles, searchKeywords } = useSelector(
    (state: RootState) => state.articles
  );

  const filteredArticles = useMemo(() => {
    return searchArticles(articles, searchKeywords);
  }, [articles, searchKeywords]);

  return filteredArticles;
};
