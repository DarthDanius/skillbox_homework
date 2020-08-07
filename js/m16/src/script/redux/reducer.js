import {ADD_POST, REMOVE_POST, CHANGE_INPUT_VALUE} from './types.js'
import {combineReducers} from 'redux';

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return state.concat(action.post);
    case REMOVE_POST:
      console.log(action.id);
      console.log('REMOVE_POST', state.filter( post => post.id !== action.id ));
      return state.filter( post => post.id !== action.id );
    default: 
      return state;
  }
}

const inputs = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
}

// const reducer = (state = {}, action) => {
//   let newState = {};

//   if (action.type === ADD_POST){
//     Object.assign(newState, state);
//     newState.posts.push(action.post);
//     return newState;
//   }

//   if (action.type === REMOVE_POST){
//     Object.assign(newState, state);
//     const index = newState.posts.indexOf( (post) => post.id === action.id );
//     newState.posts.splice(index, 1);
//     return newState;
//   }
  
//   if (action.type === CHANGE_INPUT_VALUE){
//     const newState = {inputs: Object.assign({}, state.inputs, {[name]: value})};
//     return newState;
//   }

//   return state;
// }
export default combineReducers({
  posts,
  inputs
})