'use strict'

import React from 'react';
import Panel from '../Panel/Panel.jsx';
import Post from '../Post/Post.jsx';
import {connect} from 'react-redux';
import {saveStore, addPost, removePost, changeInputValue} from '../../redux/actions'

class Widget extends React.Component{

  componentDidUpdate() {
    // console.log(this.state.inputs)
    this.props.toSaveStore();
  }

  componentDidMount() {
    // this.props.toLoadStore();
  }

  render(){
    return (
      <>
        <h1 className="widget__title">HelloWorld</h1>

        { 
          this.props.posts.map( (post, i) => {
            return  (
              <Post
                key={post.id}
                id={post.id}
                name={post.name}
                message={post.message}
                date={post.date}
                removePost={this.props.toRemovePost}
              />
            )
          })
        }

        <Panel
          inputs={this.props.inputs}
          changeInputValue={this.props.toChangeInputValue}
          addPost={this.props.toAddPost}
        />

      </>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state', state);
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    toSaveStore: () => dispatch(saveStore()),
    toAddPost: (post) => dispatch(addPost(post)),
    toRemovePost: (id) => dispatch(removePost(id)),
    toChangeInputValue: (name, value) => dispatch(changeInputValue(name, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
// export default Widget;