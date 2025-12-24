import React from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { useArticles } from '../../hooks/useArticles';
import { useArticleSearch } from '../../hooks/useArticleSearch';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { loading, error } = useArticles();
  const filteredArticles = useArticleSearch();

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className={styles.homePage}>
      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.searchSection}>
          <Typography variant="subtitle1" className={styles.filterLabel}>
            Filter by keywords
          </Typography>
          <SearchBar />
        </Box>

        <Typography variant="h6" className={styles.resultsCount}>
          Results: {filteredArticles.length}
        </Typography>

        <Grid container spacing={5} className={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>

        {filteredArticles.length === 0 && (
          <Box className={styles.noResults}>
            <Typography variant="body1">No articles found.</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};
