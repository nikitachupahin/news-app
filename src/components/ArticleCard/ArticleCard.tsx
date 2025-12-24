import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import type { SearchResult } from '../../types/article';
import { HighlightedText } from '../HighlightedText/HighlightedText';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  article: SearchResult;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();
  const searchKeywords = useSelector(
    (state: RootState) => state.articles.searchKeywords
  );

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  const truncatedSummary =
    article.summary.length > 100
      ? article.summary.slice(0, 100) + '...'
      : article.summary;

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const date = new Date(article.published_at);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;

  return (
    <Card className={styles.card} onClick={handleClick}>
      <CardMedia
        component="img"
        height="220"
        image={article.image_url}
        alt={article.title}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Box className={styles.dateBox}>
          <CalendarTodayIcon fontSize="small" color="action" />
          <Typography variant="body2" className={styles.dateText}>
            {formattedDate}
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" className={styles.title}>
          <HighlightedText text={article.title} keywords={searchKeywords} />
        </Typography>
        <Typography variant="body2" className={styles.description}>
          <HighlightedText text={truncatedSummary} keywords={searchKeywords} />
        </Typography>
        <Typography variant="body2" className={styles.readMore}>
          Read more →
        </Typography>
      </CardContent>
    </Card>
  );
};
