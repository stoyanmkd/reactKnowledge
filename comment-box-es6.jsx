import React from 'react';
import ReactDOM from 'react-dom';
import CommentList from './comment-list.jsx'
import CommentForm from './comment-form.jsx'
import $ from 'jquery'

class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: []};
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
    }

    refreshComments(){
        $.ajax({
            method: 'GET',
            url: this.props.url,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ data: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    }
    handleCommentSubmit(comment){
        $.ajax({
            method: 'POST',
            url: this.props.url,
            dataType: 'json',
            data: comment,
            cache: false
        }).done((newComment) => {
            let newComments = this.state.data.concat([newComment]);
            this.setState({ data: newComments });
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    }
    handleCommentDelete(commentId){
        $.ajax({
            method: 'DELETE',
            url: this.props.url + "/" + commentId,
            dataType: 'json',
            data: commentId,
            cache: false
        }).done((delComment) => {
            let newComments = this.state.data.filter((comment) => {
                return (comment.id !== delComment.id);
            });
            this.setState({ data: newComments });
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    }
    componentDidMount() {
        this.interval = setInterval( this.refreshComments, this.props.pollInterval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        return (
            <div className='commentBox'>
                <h1>Comments Demo</h1>
                <CommentList onCommentDelete={this.handleCommentDelete} data={this.state.data} />
                <CommentForm onCommentsSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}

CommentBox.propTypes = {
    url: React.PropTypes.string.isRequired,
    pollInterval: React.PropTypes.number.isRequired
};

ReactDOM.render(
    <CommentBox url='/api/comments' pollInterval={2000} />,
    document.getElementById('commentBox')
);