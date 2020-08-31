import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: ''
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
            this.props.handleAdd(e);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
          this.props.history.push('/');
    }

    componentDidMount() {
      this._isMounted = true;
    }

    handleName(e) {
        this.setState({name: e.target.value});
    }

    validateName() {
        const name = this.state.name.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }

    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
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
                        onChange={e => this.handleName(e)}
                        required
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
                <div className="error__container">
                  {this.state.error}
                </div>
            </form>
        )
    }
}

AddFolder.propTypes = {
  handleAdd: PropTypes.func,
};

export default withRouter(AddFolder)