import {SAVE_STORE} from './types'

const prefix = '82kcew32dA3';

export const localStorageMiddleware = store => next => action => {
  if (action.type === SAVE_STORE) {
    localStorage.setItem( prefix+'_state' , JSON.stringify( store.getState() ));
    console.log('state сохранен')
  }
  return next(action);
}