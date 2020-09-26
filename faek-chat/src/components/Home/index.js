import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutAction } from '../../actions/userActions'
import { getChatrooms, addChatrooms } from '../../actions/chatActions'

import './styles.css'



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            submitted: false,
            chatrooms: [],
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getChatrooms(); 
    }
    

    handleLogout(e) {
        e.preventDefault()
        this.props.logoutAction()
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { name } = this.state;
        if (name) {
            this.props.addChatrooms(name);
            this.props.getChatrooms()
            this.setState({ chatrooms: this.props.chatrooms}) 
        }
        console.log("chat state", this.state)
        console.log("chat props", this.props)
    }

    
    render(){
        
        const { name, submitted, chatrooms } = this.state;
        return (
            <div className='home'>
                <div >
                    <p className="welcome-msg">Welcome {this.props.email}</p>
                    <h3>Chat Rooms</h3>
                    <form className="addchat-form" onSubmit={this.handleSubmit}>
                        <input className="chat-input" placeholder="Room Name" name="name" value={name} onChange={this.handleChange}></input>
                        {submitted && !name && <p>Room Name is required</p>}
                        <br />
                        <button className="add-chat-btn">Add</button>
                    </form>
                    <div className="chatrooms">
                        {chatrooms.map((chatroom) => (
                            <div key={chatroom._id} className="chatroom">
                                <div>{chatroom.name}</div>
                                {/*Add /home/:user/ to the below route */}
                                <Link to={"/chatroom/" + chatroom._id}> 
                                <div className="join">Join</div>
                                </Link>
                            </div>
                        ))}
                    </div>   
                </div>

                <button className="logout-btn" onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
      email: state.user.email,
      chatrooms: state.chat.chatrooms
    }
    
}

export default connect(mapStateToProps, { logoutAction, getChatrooms, addChatrooms })(Home)