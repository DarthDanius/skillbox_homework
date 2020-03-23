'use strict'

import React from 'react';

let Panel = (props) => {
  return (
    <div className="widget__panel panel">
      <div className="panel__group">
        <input
          className="panel__name"
          id={props.id}
          type="text"
          placeholder="Имя"
          value={props.newPostName}
          onChange={ (e) => props.changePostName(e.target.value) }
        />
        <textarea
          className="panel__text"
          id={props.id}
          value={props.newPostText}
          onChange={ (e) => props.changePostText(e.target.value) }
        />
      </div>
      <button
      className="panel__btn btn"
      type="button"
      onClick={props.addPost}
      >
        отправить</button>
    </div>
  )
}

export default Panel;