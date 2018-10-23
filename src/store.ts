/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import HTTP from '@/api/http';

// Модели
import { Shelf, Book } from '@/api/models';

Vue.use(Vuex);

// Мутации
const SET_USER_ID = 'SET_USER_ID';
const SET_SHELVES = 'SET_SHELVES';
const SELECT_SHELF = 'SELECT_SHELF';
const SET_SORT = 'SET_SORT';
const SET_BOOKS = 'SET_BOOKS';
const CLEAR_BOOKS = 'CLEAR_BOOKS';
const INC_BOOKS_PAGE = 'INC_BOOKS_PAGE';
const LOAD_MORE_BOOKS = 'LOAD_MORE_BOOKS';

// Хранилище
class State {
  // Идентификатор пользователя
  public userId: string | null = null;

  // Полки
  public shelves: Shelf[] = [];

  // Полка - прочитанные
  public readonly READED: Shelf = {
    id: 'readed',
    title: 'Прочитанные книги',
  };

  // Выбранная полка
  public shelf: Shelf | null = null;

  // Сортировка
  public sortQuery: string | null = null;

  // Книги
  public books: Book[] = [];

  // Страница списка книг
  public bookPage: number = 1;

  // Флаг, выполняется догрузка
  public hasRequestLoadMore: boolean = false;
}

export default new Vuex.Store({
  state: new State(),
  getters: {
    shelves(state: State) {
      return state.shelves;
    },
    shelf(state: State) {
      return state.shelf;
    },
    books(state: State) {
      return state.books;
    },
  },
  mutations: {
    [SET_USER_ID](state: State, userId: string) {
      state.userId = userId;
    },
    [SET_SHELVES](state: State, shelves: Shelf[]) {
      state.shelves = shelves;
    },
    [SELECT_SHELF](state: State, shelf: Shelf) {
      state.shelf = shelf;
    },
    [SET_SORT](state: State, sortQuery: string) {
      state.sortQuery = sortQuery;
    },
    [SET_BOOKS](state: State, books: Book[]) {
      state.books = books;
    },
    [CLEAR_BOOKS](state: State) {
      state.books = [];
      state.bookPage = 1;
      state.hasRequestLoadMore = false;
    },
    [INC_BOOKS_PAGE](state: State) {
      state.bookPage += 1;
    },
    [LOAD_MORE_BOOKS](state: State, hasRequest: boolean) {
      state.hasRequestLoadMore = hasRequest;
    },
  },
  actions: {
    // Установить текущего пользователя
    setUserId({ commit }, userId: string) {
      commit(SET_USER_ID, userId);
    },

    // Получить все полки пользователя
    async getShelves({ commit, state }) {
      try {
        commit(SET_SHELVES, []);
        commit(SELECT_SHELF, null);

        const response = await HTTP.get(
          '/api/userbooks/bookshelf',
          {
            params: {
              user: state.userId,
            },
          },
        );
        const shelves = (response.data || [])
          .map((item: any): Shelf => new Shelf(item));

        // Последняя полка - прочитанные
        shelves.push(state.READED);

        commit(SET_SHELVES, shelves);

        return shelves;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Выбрать полку пользователя
    selectShelf({ commit, dispatch, state }, params: any) {
      const { sort, dir, shelfId } = params;
      const sortQuery = dir
        ? `-${sort}`
        : `${sort}`;
      const find = state.shelves.find(item => item.id === shelfId);
      commit(SELECT_SHELF, find);
      commit(CLEAR_BOOKS);
      commit(SET_SORT, !sort && !dir ? null : sortQuery);
      dispatch('loadMoreBooks');
    },

    // Загрузить книги
    async loadMoreBooks({ commit, dispatch, state }) {
      if (!state.shelf) {
        // Полка не выбрана
        return;
      }

      if (state.hasRequestLoadMore) {
        // Запрос уже отправлен
        return;
      }

      try {
        commit(LOAD_MORE_BOOKS, true);

        const response = state.shelf === state.READED
          ? await dispatch('getReadedBooks')
          : await dispatch('getShelfBooks');

        if (!state.hasRequestLoadMore) {
          // Догрузка была сброшена
          return;
        }

        const books = (response.data.objects || [])
          .map((item: any): Book => new Book(item));
        const allBooks = [...state.books, ...books];

        commit(SET_BOOKS, allBooks);
        commit(INC_BOOKS_PAGE);
        commit(LOAD_MORE_BOOKS, false);
      } catch (error) {
        commit(LOAD_MORE_BOOKS, false);
        throw new Error(error.message);
      }
    },

    // Книги из полки
    getShelfBooks({ state }) {
      return HTTP.get(
        '/api/userbooks',
        {
          params: {
            user: state.userId,
            bookshelf: state.shelf && state.shelf.id,
            page: state.bookPage,
            o: state.sortQuery,
          },
        },
      );
    },

    // Книги - прочитанные
    getReadedBooks({ state }) {
      return HTTP.get(
        '/api/rating',
        {
          params: {
            user: state.userId,
            page: state.bookPage,
            o: state.sortQuery,
          },
        },
      );
    },
  },
});
