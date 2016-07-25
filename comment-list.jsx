import React from 'react';
import Comment from './comment.jsx';

export default class CommentList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let commentNodes = this.props.data.map((comment) => {
            return (
              <Comment author={comment.author} commentId={comment.id} key={comment.id} onCommentDelete={this.props.onCommentDelete}>
                  {comment.text}
              </Comment>
            );
        });
        return (
            <div className='commentList'>
                {commentNodes}
            </div>
        );
    }
}

CommentList.propTypes = {
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            author: React.PropTypes.string,
            text: React.PropTypes.string
        })
    ),
    onCommentDelete: React.PropTypes.func
};