import React from 'react';

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {author: '', text: ''};
        this.setState = this.setState.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(e){
        this.setState({author: e.target.value})
    }
    handleTextChange(e){
        this.setState({text: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if(!text || !author){
            return;
        }
        this.props.onCommentsSubmit({author: author, text: text});
        this.setState({author: '', text: ''})
    }
    render(){
        return (
            <form className='commentForm'>
                <input type='text' value={this.state.author} placeholder='Your Name' onChange={this.handleAuthorChange}/>
                <br />
                <input type='text' value={this.state.text} placeholder='Say something' onChange={this.handleTextChange}/>
                <br />
                <input type='submit' value='Post' onClick={this.handleSubmit}/>
            </form>
        );
    }
}

CommentForm.propTypes = {
    onCommentsSubmit: React.PropTypes.func
};

export default CommentForm