import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import { Link } from 'react-router-dom';

export default class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            name: ''
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const { name } = this.state;
        const folder = {name};
        const url = `${config.API_ENDPOINT}/folders`;
        const options = {
          method: 'POST',
          body: JSON.stringify(folder),
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
                name: ''
            });
            this.props.handleAdd(folder);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
          this.props.history.push('/');
    }

    handleName(e) {
        console.log(this.nameInput.current.value)
        this.setState({name: this.nameInput.current.value});
    }

    validateName() {
        const name = this.state.name.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }

    render() {
        const nameError = this.validateName();
        return(
            <form className="add-note__container" 
            onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input 
                        type="text" 
                        className="registration__control"
                        name="name" 
                        id="name" 
                        ref={this.nameInput}
                        onChange={e => this.handleName(e)}
                    />
                    <ValidationError message={nameError}/>
                </div>
                <div className="registration__button__group">
                    <Link to='/'>
                        <button type="reset" className="registration__button">
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="registration__button"
                        disabled={
                            this.validateName()  
                        }
                        >
                    Save
                    </button>
                </div>
            </form>
        )
    }
}