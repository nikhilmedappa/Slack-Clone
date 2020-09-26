import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import { loginAction } from '../../actions/userActions'
import { connect } from 'react-redux'

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.loginAction(email, password);
      this.props.setupSocket()
    }
  }

  
  render(){
    const { email, password, submitted } = this.state;
    return (
      <div className="signin">
        <div className="dark-bg">
          <form onSubmit={this.handleSubmit}>
            <input className="signin-input" placeholder="Email" name="email" value={email} onChange={this.handleChange}></input>
            {submitted && !email && <p className="alert">Email is required</p>}
            <br />
            <input className="signin-input" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}></input>
            {submitted && !password && <p className="alert">Password is required</p>}
            <br />
            <button className="signin-btn">Sign In</button>
          </form>
          <div className="register-link">
            <Link to="/register">Register</Link>
          </div>
          
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    usertoken: state.user.usertoken
  }
  
}

export default connect(mapStateToProps, {loginAction})(SigninPage);
