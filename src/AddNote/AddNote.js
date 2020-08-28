import React, { Component } from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import './AddNote.css';
import ValidationError from '../ValidationError/ValidationError'

export default class Addnote extends Component {

    constructor(props) {
        super(props);
        const folderId = this.props.match.params.folderId;
        this.nameInput = React.createRef();
        this.contentInput = React.createRef();
        this.state = {
            name: 'Card',
            content: 'Info',
            folderId: folderId,
            modified: Date().toLocaleString()
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, content, modified, folderId } = this.state;
        const url = `${config.API_ENDPOINT}/notes`;
        const options = {
          method: 'POST',
          body: JSON.stringify({name, content, modified, folderId}),
          headers: {
            "Content-Type": "application/json",
          }
        };
    
        fetch(url, options)
          .then(res => {
            if(!res.ok) {
              throw new Error('Something went wrong, please try again later');
            }
            return res.json();
          })
          .then(data => {
            this.setState({
                name: '',
                content: '',
            });
            this.props.handleState(name);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
          this.props.history.push('/');
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    handleName(name) {
        console.log(this.nameInput.current.value)
        this.setState({name: this.nameInput.current.value});
    }

    handleContent(noteContent) {
        this.setState({content: this.contentInput.current.value});
    }

    validateName() {
        const name = this.state.name.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }

    validateContent() {
        const name = this.state.content.trim();
        if (name.length === 0) {
          return 'Content is required';
        }
    }

    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        return(
            <form className="add-note__container" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="registration__control"
                    name="name" id="noteName"
                    ref={this.nameInput}
                    onChange={e => this.handleName(e.target.name)}/>
                    <ValidationError message={nameError}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content *</label>
                    <textarea className="content__box"
                    name="content" id="noteContent"
                    ref={this.contentInput}
                    onChange={e => this.handleContent(e.target.content)}>
                    </textarea>
                    <ValidationError message={contentError}/>
                </div>

                <div className="registration__button__group">
                    <Link to='/'> 
                        <button type="reset" className="add__button">
                            Cancel
                        </button>
                    </Link>
                    <button type="submit" className="add__button"
                    disabled={
                        this.validateName() && this.validateContent()  
                    }>
                        Save
                    </button>
                </div>
            </form>
        )
    }
}