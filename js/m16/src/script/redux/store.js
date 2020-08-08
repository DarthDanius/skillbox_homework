import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducer.js';
import {localStorageMiddleware} from './middleware';
import {CreatePost} from '../libs/libs.js'
import {STORE_PREFIX} from './types'

function getState(){
  const store = localStorage.getItem( STORE_PREFIX+'_state' );
  if (store) {
    console.log('state загружен')
    return JSON.parse(store);
  }
}

const initialState = {
  posts: [
    new CreatePost('Вася', 'Всем привет!'),
    new CreatePost('Петя', 'Всем привет!'),
    new CreatePost('Коля', 'Всем привет!'),
    new CreatePost('Женя', 'Всем привет!'),
    new CreatePost('Миша', 'Всем привет!')
  ],
  inputs: {}
};

const store = createStore( 
  rootReducer,
  getState() || initialState,
  applyMiddleware( localStorageMiddleware )
);

// console.log(store);

export default store;
