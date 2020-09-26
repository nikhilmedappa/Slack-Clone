import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import { connect } from 'react-redux'
import { signupAction } from '../../actions/userActions'



class SignupPage extends Component {
constructor(props) {
  super(props);

  this.state = {
    name: "",
    email: "",
    password: "",
    submitted: false
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { name, email, password } = this.state;
    if (email && password) {
      this.props.signupAction(name, email, password);
    }
    
  }

  render(){
  
    const { name, email, password, submitted } = this.state;

    return (
      <div className="signup">
        <div className="dark-bg">
          <form onSubmit={this.handleSubmit}>
            <h2>Register</h2>
            <input className="input" placeholder="Name" name="name" value={name} onChange={this.handleChange}></input>
            {submitted && !name && <p>Name is required</p>}
            <br />
            <input className="input" placeholder="Email" name="email" value={email} onChange={this.handleChange}></input>
            {submitted && !email && <p>Email is required</p>}
            <br />
            <input className="input" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}></input>
            {submitted && !password && <p>Password is required</p>}
            <br />
            <button className="submit-btn">Sign Up</button>
          </form>
          <div className="register-link">
            <Link to="/signin">Sign In</Link>
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    email: state.user.email
  }
}
export default connect(mapStateToProps, {signupAction})(SignupPage);