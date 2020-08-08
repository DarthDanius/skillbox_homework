import {SAVE_STORE, STORE_PREFIX} from './types'

export const localStorageMiddleware = store => next => action => {
  if (action.type === SAVE_STORE) {
    localStorage.setItem( STORE_PREFIX+'_state' , JSON.stringify( store.getState() ));
    console.log('state сохранен')
  }
  // if (action.type === LOAD_STORE) {
  //   const store = localStorage.getItem( STORE_PREFIX+'_state' );
  //   if (store) {
  //     console.log('state загружен')
  //     return JSON.parse(store);
  //   }
  // }
  return next(action);
}