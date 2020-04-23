import { gifListSlice, GifListState, GiphyGif } from './gifListSlice';

const createGif = (str: String) => {
  return {
    id: str,
    title: str,
    slug: str,
    url: str,
    embed_url: str,
    images: {
      fixed_height: {
        url: str,
      },
      downsized_large: {
        url: str,
      }
    }
  } as GiphyGif;
};

test('appending to gif list', () => {
  const initialState = {
    gifs: [createGif('1'), createGif('2')],
  } as GifListState;

  const appendGifAction = gifListSlice.actions.appendGifs([createGif('3')]);
  const newState = gifListSlice.caseReducers.appendGifs(initialState, appendGifAction);

  expect(newState.gifs.length).toBe(3);
  expect(newState.gifs[0].url).toBe('1');
  expect(newState.gifs[1].url).toBe('2');
  expect(newState.gifs[2].url).toBe('3');
});

test('replacing gif list', () => {
  const initialState = {
    gifs: [createGif('1'), createGif('2')],
  } as GifListState;

  const appendGifAction = gifListSlice.actions.replaceGifs([createGif('3'), createGif('4')]);
  const newState = gifListSlice.caseReducers.replaceGifs(initialState, appendGifAction);

  expect(newState.gifs.length).toBe(2);
  expect(newState.gifs[0].url).toBe('3');
  expect(newState.gifs[1].url).toBe('4');
});

