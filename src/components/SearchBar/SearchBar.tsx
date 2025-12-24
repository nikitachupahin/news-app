import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeywords } from '../../store/articlesSlice';
import type { RootState } from '../../store/store';
import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchKeywords = useSelector(
    (state: RootState) => state.articles.searchKeywords
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeywords(e.target.value));
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Enter keywords"
      value={searchKeywords}
      onChange={handleSearchChange}
      className={styles.searchBar}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="large" />
            </InputAdornment>
          ),
          className: styles.inputRoot,
        },
      }}
    />
  );
};
