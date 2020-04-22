import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTrending,
  selectGifs,
  selectMode,
  selectOffset,
  GiphyGif,
  fetchSearch,
  selectTerm,
} from './gifListSlice';
import { Grid, Card, TextField, Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint';

const useGifStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '200px',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
  },
}));

interface GifProps {
  gif: GiphyGif,
};

export const Gif: React.FC<GifProps> = ({ gif }) => {
  const classes = useGifStyles();
  // @ts-ignore
  const url = gif.images.fixed_height.url || '';
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <Link to={`/view/${gif.slug}`}>
          <img className={classes.image} src={url} alt={gif.title} height="200px" />
        </Link>
      </Card>
    </Grid>
  );
}

const useGifListStyles = makeStyles((theme) => ({
  searchForm: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    marginLeft: theme.spacing(2),
  },
}));

export const GifList = () => {
  const classes = useGifListStyles();

  const gifs = useSelector(selectGifs);
  const mode = useSelector(selectMode);
  const offset = useSelector(selectOffset);
  const term = useSelector(selectTerm);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  return (
    <Container>
      <form
        className={classes.searchForm}
        onSubmit={(e) => {
          e.preventDefault();
          const searchField = (e.currentTarget?.querySelector('[name="search"]') as HTMLInputElement);
          const query = searchField?.value ?? '';
          dispatch(fetchSearch(0, query));
        }}
      >
        <TextField variant="outlined" name="search" label="Search" />
        <Button className={classes.submitButton} type="submit" variant="contained" color="secondary" size="large">Go</Button>
      </form>

      <Grid container spacing={4}>
        {gifs.map((gif) => <Gif gif={gif} />)}
        <Waypoint
          onEnter={() => {
            if (mode === 'trending') {
              dispatch(fetchTrending(offset));
            } else {
              dispatch(fetchSearch(offset, term));
            }
          }}
        />
      </Grid>
    </Container>
  );
}
