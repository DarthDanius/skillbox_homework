'use strict'

import React from 'react';
import {CreatePost} from '../../libs/libs.js'

let Panel = (props) => {
  return (
    <div className="widget__panel panel">
      <div className="panel__group">
        <input
          className="panel__name"
          id={props.id}
          name='name'
          type="text"
          placeholder="Имя"
          value={props.inputs.name ? props.inputs.name : ''}
          onChange={ (e) => props.changeInputValue(e.target.name, e.target.value) }
        />
        <textarea
          className="panel__text"
          id={props.id}
          name='message'
          value={props.inputs.message ? props.inputs.message : ''}
          onChange={ (e) => props.changeInputValue(e.target.name, e.target.value) }
        />
      </div>
      <button
        className="panel__btn btn"
        type="button"
        onClick={ ()=>props.addPost( new CreatePost(props.inputs.name, props.inputs.message) )}
      >
        отправить
      </button>
    </div>
  )
}

export default Panel;