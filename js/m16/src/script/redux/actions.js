import {ADD_POST, REMOVE_POST, CHANGE_INPUT_VALUE, SAVE_STORE} from './types';



export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export const removePost = (id) => {
  return {
    type: REMOVE_POST,
    id
  }
}

export const changeInputValue = (name, value) => {
  return {
    type: CHANGE_INPUT_VALUE,
    name,
    value
  }
}

export const saveStore = () => {
  return {
    type: SAVE_STORE
  }
}

// export const loadStore = (store) => {
//   return {
//     type: LOAD_STORE,
//     store
//   }
// }