import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList, (state, action) =>
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(ReadingListActions.removeFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, state)
  ),
  on(ReadingListActions.failedAddToReadingList, (state, action) =>
    readingListAdapter.removeOne(action.book.id, state)
  ),
  on(ReadingListActions.failedRemoveFromReadingList, (state, action) =>
    readingListAdapter.addOne(action.item, state)
  ),
  on(ReadingListActions.finishedFromReadingList, (state, action) => {
    const updateItem: Update<ReadingListItem> = {
      id: action.item.bookId,
      changes: {
        finished: true,
        finishedDate: action.finishedDate
      }
    }
    return readingListAdapter.updateOne(updateItem, state);
  }),
  on(ReadingListActions.failedFinishedFromReadingList, (state, action) => {
    const updateItem: Update<ReadingListItem> = {
      id: action.item.bookId,
      changes: {
        finished: false,
        finishedDate: ''
      }
    }
    return readingListAdapter.updateOne(updateItem, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
