import React from 'react';
import Remarkable from 'remarkable';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e){
        e.preventDefault();
        let commentId = this.props.commentId;
        if(!commentId){
            return;
        }
        this.props.onCommentDelete(commentId);
    }

    rawMarkup() {
        let md = new Remarkable();
        let rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup}
    }

    render() {
        return (
            <div className='comment'>
                <h2 className='commentAuthor'>
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
                <button onClick={this.handleDelete}>
                    Delete
                </button>
            </div>
        );
    }
}

Comment.propTypes = {
    author: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    commentId: React.PropTypes.string.isRequired,
    onCommentDelete: React.PropTypes.func
};