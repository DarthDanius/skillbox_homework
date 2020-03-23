'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './Panel/Panel.jsx'
import Post from './Post/Post.jsx'

class Widget extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {id:0, name:'Вася', message:'Всем привет!', date: new Date},
        {id:1, name:'Петя', message:'Всем привет!', date: new Date},
        {id:2, name:'Коля', message:'Всем привет!', date: new Date},
        {id:3, name:'Женя', message:'Всем привет!', date: new Date},
        {id:4, name:'Миша', message:'Всем привет!', date: new Date},
      ],
      newPostText:'',
      newPostName:''
    }

    this.prefix = '82kcew32dA3';

    if (localStorage.hasOwnProperty(this.prefix+'_state')) {
      Object.assign(this.state, JSON.parse(localStorage.getItem( this.prefix+'_state' , this.state )));
      console.log('state загружен')
    }

    this.removePost = this.removePost.bind(this);
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
      id:4,
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

  render(){
    return (
      <div className="widget">
        <h1 className="widget__title">HelloWorld</h1>

        { 
          this.state.posts.map( (post, i) => {
            return  <Post key={i} id={post.id} name={post.name} message={post.message} date={post.date} removePost={this.removePost} />
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