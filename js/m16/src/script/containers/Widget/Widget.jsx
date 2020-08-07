'use strict'

import React from 'react';
import Panel from '../Panel/Panel.jsx'
import Post from '../Post/Post.jsx'
import {connect} from 'react-redux'

class Widget extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        // {id: this.generateId(), name:'Вася', message:'Всем привет!', date: new Date},
        // {id: this.generateId(), name:'Петя', message:'Всем привет!', date: new Date},
        // {id: this.generateId(), name:'Коля', message:'Всем привет!', date: new Date},
        // {id: this.generateId(), name:'Женя', message:'Всем привет!', date: new Date},
        // {id: this.generateId(), name:'Миша', message:'Всем привет!', date: new Date},
      ],
      inputs: {}
    };

    this.prefix = '82kcew32dA3';

    if (localStorage.hasOwnProperty(this.prefix+'_state')) {
      this.loadState();
    }

    this.changeInputValue = this.changeInputValue.bind(this);
    this.addPost = this.addPost.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  loadState() {
    let storageState = null;
    try {
      storageState = JSON.parse(localStorage.getItem( this.prefix+'_state' , this.state ));
    } catch(err) {
      console.err(err);
    }
    Object.assign(this.state, storageState);
    console.log('state загружен');
  }

  saveState() {
    localStorage.setItem( this.prefix+'_state' , JSON.stringify(this.state) );
    console.log('state сохранен')
  }

  generateId(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
  }

  changeInputValue(value, name) {
    this.setState( (state) => {
      const newState = {inputs: Object.assign({}, state.inputs, {[name]: value})};
      return newState;
    });
  }

  addPost(e) {

    for (let i of Object.keys(this.state.inputs)) {
      if (!this.state.inputs[i].trim()){
        alert ('необходимо заполнить поля');
        return
      }
    }
    
    this.setState(
      (state)=>{
        const newState = {};
        newState.posts = [...state.posts];
        newState.posts.push({
          id: this.generateId(),
          name: this.state.inputs.name,
          message: this.state.inputs.message,
          date: new Date
        });
        newState.inputs = {};
        console.log(newState);
        return newState;
      },
      ()=>this.saveState()
    );
  }

  removePost(e, id) {
    const postIndex = this.state.posts.findIndex((el) => el.id === id );// преобразуем копию
    const newState = this.state.posts.splice(postIndex, 1);
    this.setState( {newState}, ()=>this.saveState() );
  }

  componentDidUpdate() {
    // console.log(this.state.inputs)
  }

  render(){
    return (
      <>
        <h1 className="widget__title">HelloWorld</h1>

        { 
          this.state.posts.map( (post, i) => {
            return  (
              <Post
                key={post.id}
                id={post.id}
                name={post.name}
                message={post.message}
                date={post.date}
                removePost={this.removePost}
              />
            )
          })
        }

        <Panel
          inputs={this.state.inputs}
          changeInputValue={this.changeInputValue}
          addPost={this.addPost}
        />

      </>
    )
  }
}

export default Widget;