import { LOGIN, LOGOUT, SIGNUP, LOGIN_DETAILS } from "./types"
import Axios from "axios"


export const loginAction = (email, password) => {

    return dispatch => {
        const authData = {
            email,
            password
        }
        Axios.post('http://localhost:8000/user/login', {email, password})
        .then(response => {
            dispatch({
                type: LOGIN,
                payload: response.data.token
            })
            dispatch({
                type: LOGIN_DETAILS,
                payload: authData.email
            })
            localStorage.setItem("CC_Token", response.data.token)
            console.log("Response", response)
            console.log("Local Storage", localStorage)
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const logoutAction = () => ({
    type: LOGOUT,
})

export const signupAction = (name, email, password ) => 
    {return dispatch => {
        // const authRegister = {
        //     username: username,
        //     email: email,
        //     password: password
        // }
        Axios.post('http://localhost:8000/user/register', {name, email, password})
        .then(response =>{
            dispatch({
                type: SIGNUP,
                payload: {
                    name: response.config.name,
                    email: response.config.data.email,
                }
            })
            console.log("Response", response)
        })
        .catch(err => {
            console.log(err);
        })
    }
}

