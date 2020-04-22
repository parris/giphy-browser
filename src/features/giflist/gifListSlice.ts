import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../utils/createStore';

// Is it OK to expose this? Maybe, I'd say since this is a public
// API and we're not a production app it wouldn't matter. This
// example app effectively stops working. The only way to protect
// this key is to make requests from our server and protect them
// endpoint by customizing CORS.
const GIPHY_API_KEY = 'JPP2L1HqEmqVOldhYxAjTogH33ttfEen';

export interface GifListState {
  offset: number,
  gifs: GiphyGif[];
  mode: string,
  term: string,
}

const initialState: GifListState = {
  offset: 0,
  gifs: [],
  mode: 'trending',
  term: '',
};

export const gifListSlice = createSlice({
  name: 'gifList',
  initialState,
  reducers: {
    appendGifs: (state, action: PayloadAction<GiphyGif[]>) => {
      return {
        ...state,
        gifs: [...state.gifs, ...action.payload],
      };
    },
    replaceGifs: (state, action: PayloadAction<GiphyGif[]>) => {
      return {
        ...state,
        gifs: [...action.payload], // ideally these are immutable structures
      };
    },
    setMode: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        mode: action.payload,
      };
    },
    setOffset: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        offset: action.payload,
      };
    },
    setTerm: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        term: action.payload,
      };
    },
  },
});

const { appendGifs, replaceGifs, setMode, setOffset, setTerm } = gifListSlice.actions;

export interface GiphyImage {
  fixed_height: {
    url: string,
  },
  fixed_height_still: {
    url: string,
  },
};
export interface GiphyGif {
  id: string,
  slug: string,
  title: string,
  url: string,
  embed_url: string,
  images: {
    fixed_height: {
      url: string,
    },
  },
};
interface GiphyPagination {
  offset: number,
  total_count: number,
  count: number,
};
interface GiphyMeta {
  msg: string,
  status: number,
  response_id: string,
};
interface GiphyResponse {
  data: GiphyGif[],
  pagination: GiphyPagination,
  meta: GiphyMeta,
};

export const fetchTrending = (withOffset = 0): AppThunk => dispatch => {
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&rating=pg&offset=${withOffset}`)
    .then((data: Response) => data.json())
    .then((response: GiphyResponse) => {
      if (withOffset === 0) {
        dispatch(replaceGifs(response.data));
      } else {
        dispatch(appendGifs(response.data));
      }
      dispatch(setMode('trending'));
      dispatch(setTerm(''));
      dispatch(setOffset(withOffset + response.pagination.count));
    });
};

export const fetchSearch = (withOffset = 0, term = ''): AppThunk => dispatch => {
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${term}&rating=pg&offset=${withOffset}`)
    .then((data: Response) => data.json())
    .then((response: GiphyResponse) => {
      if (withOffset === 0) {
        dispatch(replaceGifs(response.data));
      } else {
        dispatch(appendGifs(response.data));
      }
      dispatch(setMode('search'));
      dispatch(setTerm(term));
      dispatch(setOffset(withOffset + response.pagination.count));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGifs = (state: RootState) => state.gifList.gifs;
export const selectOffset = (state: RootState) => state.gifList.offset;
export const selectMode = (state: RootState) => state.gifList.mode;
export const selectTerm = (state: RootState) => state.gifList.term;

export default gifListSlice.reducer;
