'use strict'

import React from 'react';

let Post = (props) => {
  let date = null;
  let formatDate = null;
  try {
    date = (typeof props.date === 'string') ? new Date(props.date) : props.date;
    formatDate = new Intl.DateTimeFormat(['ru', 'en'], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    // console.error('formatDate', formatDate);
  } catch(err) {
    console.error(err);
    return false
  }

  return (
    <article id={props.id} className="post">
      <p className="post__name">
        {props.name}
        <span className="post__remove-wrap">
          <button type="button" className="post__remove" onClick={ () => {props.removePost(props.id)} }></button>
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