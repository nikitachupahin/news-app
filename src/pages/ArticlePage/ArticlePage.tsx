/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { articlesApi } from '../../services/api';
import type { Article } from '../../types/article';
import styles from './ArticlePage.module.scss';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await articlesApi.getArticleById(parseInt(id));
        setArticle(data);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Container>
        <Typography variant="h6">Article not found</Typography>
      </Container>
    );
  }

  return (
    <div className={styles.articlePage}>
      <Box
        className={styles.heroImage}
        sx={{
          backgroundImage: `url(${article.image_url})`,
        }}
      />
      <Container maxWidth="lg" className={styles.contentContainer}>
        <Box className={styles.content}>
          <Typography variant="h4" component="h1" className={styles.title}>
            {article.title}
          </Typography>

          <Box className={styles.articleBody}>
            <Typography variant="body1">{article.summary}</Typography>
            <Typography
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.articleSource}
            >
              Source: {article.news_site}
            </Typography>
          </Box>
        </Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          className={styles.backButton}
        >
          Back to homepage
        </Button>
      </Container>
    </div>
  );
};
