import type { Article, SearchResult } from '../types/article';

export const searchArticles = (
  articles: Article[],
  keywords: string
): SearchResult[] => {
  if (!keywords.trim()) {
    return articles.map((article) => ({
      ...article,
      score: 0,
      matchedIn: 'title' as const,
    }));
  }

  const keywordArray = keywords
    .toLowerCase()
    .split(/\s+/)
    .filter((k) => k.length > 0);

  const results: SearchResult[] = [];

  articles.forEach((article) => {
    const titleLower = article.title.toLowerCase();
    const summaryLower = article.summary.toLowerCase();

    let titleMatches = 0;
    let summaryMatches = 0;

    keywordArray.forEach((keyword) => {
      if (titleLower.includes(keyword)) {
        titleMatches++;
      }
      if (summaryLower.includes(keyword)) {
        summaryMatches++;
      }
    });

    if (titleMatches > 0 || summaryMatches > 0) {
      let matchedIn: 'title' | 'summary' | 'both';
      let score: number;

      if (titleMatches > 0 && summaryMatches > 0) {
        matchedIn = 'both';
        score = titleMatches * 2 + summaryMatches;
      } else if (titleMatches > 0) {
        matchedIn = 'title';
        score = titleMatches * 2;
      } else {
        matchedIn = 'summary';
        score = summaryMatches;
      }

      results.push({
        ...article,
        score,
        matchedIn,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
};

export const highlightKeywords = (
  text: string,
  keywords: string
): { text: string; isHighlighted: boolean }[] => {
  if (!keywords.trim()) {
    return [{ text, isHighlighted: false }];
  }

  const keywordArray = keywords
    .toLowerCase()
    .split(/\s+/)
    .filter((k) => k.length > 0);

  const parts: { text: string; isHighlighted: boolean }[] = [];
  let currentIndex = 0;
  const textLower = text.toLowerCase();

  const matches: { start: number; end: number }[] = [];

  keywordArray.forEach((keyword) => {
    let index = textLower.indexOf(keyword);
    while (index !== -1) {
      matches.push({ start: index, end: index + keyword.length });
      index = textLower.indexOf(keyword, index + 1);
    }
  });

  matches.sort((a, b) => a.start - b.start);

  const mergedMatches: { start: number; end: number }[] = [];
  matches.forEach((match) => {
    if (
      mergedMatches.length === 0 ||
      match.start > mergedMatches[mergedMatches.length - 1].end
    ) {
      mergedMatches.push(match);
    } else {
      mergedMatches[mergedMatches.length - 1].end = Math.max(
        mergedMatches[mergedMatches.length - 1].end,
        match.end
      );
    }
  });

  mergedMatches.forEach((match) => {
    if (currentIndex < match.start) {
      parts.push({
        text: text.slice(currentIndex, match.start),
        isHighlighted: false,
      });
    }
    parts.push({
      text: text.slice(match.start, match.end),
      isHighlighted: true,
    });
    currentIndex = match.end;
  });

  if (currentIndex < text.length) {
    parts.push({ text: text.slice(currentIndex), isHighlighted: false });
  }

  return parts;
};
