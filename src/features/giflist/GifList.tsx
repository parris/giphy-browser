import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTrending,
  selectGifs,
  selectMode,
  selectOffset,
  GiphyGif,
} from './gifListSlice';
import { Grid, Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint';

const useGifStyles = makeStyles({
  card: {
    width: '100%',
    height: '200px',
  },
});

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
          <img src={url} alt={gif.title} height="200px" />
        </Link>
      </Card>
    </Grid>
  );
}

export const GifList = () => {
  const gifs = useSelector(selectGifs);
  const mode = useSelector(selectMode);
  const offset = useSelector(selectOffset);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  return (
    <Grid container spacing={4}>
      {gifs.map((gif) => <Gif gif={gif} />)}
      <Waypoint
        onEnter={() => {
          if (mode === 'trending') {
            dispatch(fetchTrending(offset));
          }
        }}
      />
    </Grid>
  );
}
