'use strict'

import React from 'react';

let Post = (props) => {

  let date = (typeof props.date === 'string') ? new Date(props.date) : props.date;
  const formatDate = new Intl.DateTimeFormat(['ru', 'en'], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  // let removePost = props.removePost();

  return (
    <article id={props.id} className="post">
      <p className="post__name">
        {props.name}
        <span>
          <button type="button" className="post__remove" onClick={ (e) => {props.removePost(e,props.id)} }></button>
        </span>
      </p>
      <p className="post__text">{props.message}</p>
      <footer className="post__footer">
        <time className="post__datetime" dateTime={date.toISOString()}>
          <span className="post__date">{formatDate}</span>
          <span className="post__time">{date.toLocaleTimeString()}</span>
        </time>
      </footer>
    </article>
  )
}

export default Post;