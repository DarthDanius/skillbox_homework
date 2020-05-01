'use strict'

import React from 'react';
import Panel from './Panel/Panel.jsx'
import Post from './Post/Post.jsx'

class Widget extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {id: this.generateId(), name:'Вася', message:'Всем привет!', date: new Date},
        {id: this.generateId(), name:'Петя', message:'Всем привет!', date: new Date},
        {id: this.generateId(), name:'Коля', message:'Всем привет!', date: new Date},
        {id: this.generateId(), name:'Женя', message:'Всем привет!', date: new Date},
        {id: this.generateId(), name:'Миша', message:'Всем привет!', date: new Date},
      ],
      newPostText:'',
      newPostName:'',
      hasError: false
    };

    this.prefix = '82kcew32dA3';

    if (localStorage.hasOwnProperty(this.prefix+'_state')) {
      this.loadState();
    }

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

  changePostText(value) {
    this.setState( {newPostText: value} );
  }

  changePostName(value) {
    this.setState( {newPostName: value} );
  }

  addPost(e) {
    if ( !this.state.newPostText || !this.state.newPostName ) {
      // красивое, плавно всплывающее окно
      alert ('необходимо заполнить поля');
      return
    }
    const newState = this.state.posts.push({
      id: this.generateId(),
      name: this.state.newPostText,
      message: this.state.newPostName,
      date: new Date
    });
    this.setState(
      ()=>{
        return {
          newState,
          newPostName: '',
          newPostText: ''
        }
      },
      ()=>this.saveState()
    );
  }

  removePost(e, id) {
    const postIndex = this.state.posts.findIndex((el) => el.id === id );// преобразуем копию
    const newState = this.state.posts.splice(postIndex, 1);
    this.setState( {newState}, ()=>this.saveState() );
  }

  generateId(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
  }

  render(){
    return (
      <div className="widget">
        <h1 className="widget__title">HelloWorld</h1>

        { 
          this.state.posts.map( (post, i) => {
            return  (
              // <ErrorBoundary key={i}>
              //   <Post id={post.id} name={post.name} message={post.message} date={post.date} removePost={this.removePost} />
              // </ErrorBoundary>
              <Post key={i} id={post.id} name={post.name} message={post.message} date={post.date} removePost={this.removePost} />
            )
          })
        }

        <Panel
          newPostText={this.state.newPostText}
          newPostName={this.state.newPostName}
          changePostName={this.changePostName.bind(this)}
          changePostText={this.changePostText.bind(this)}
          addPost={this.addPost.bind(this)}
        />

      </div>
    )
  }
}

export default Widget;