import { createStore } from 'redux';
import messages from '../translations';

const initialState = {
  term: '',
  city: '',
  locales: {
    lang: typeof localStorage !== 'undefined' && localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru',
    messages: typeof localStorage !== 'undefined' && localStorage.getItem('lang') ? messages[localStorage.getItem('lang')] : messages['ru'],
  },
  page: typeof localStorage !== 'undefined' && localStorage.getItem('page') ? localStorage.getItem('page') : '/ru',
};

function appState(state = initialState, action) {
  switch (action.type) {
    case 'term':
      return Object.assign({}, state, {
        term: action.value,
      });
    case 'city':
      return Object.assign({}, state, {
        city: action.value,
      });
    case 'locales':
      return Object.assign({}, state, {
        locales: action.value,
      });
    case 'page':
      return Object.assign({}, state, {
        page: action.value,
      });
    default:
      return state;
  }
}

const store = createStore(appState);

export default store;
