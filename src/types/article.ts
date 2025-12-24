export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: LaunchObj[];
  events: EventObj[];
}

type LaunchObj = {
  launch_id: string;
  provider: string;
};

type EventObj = {
  event_id: number;
  provider: string;
};

export interface SearchResult extends Article {
  score: number;
  matchedIn: 'title' | 'summary' | 'both';
}
