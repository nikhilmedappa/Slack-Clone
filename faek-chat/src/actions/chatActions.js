import { GET_CHATROOMS } from './types'
import Axios from "axios"

export const getChatrooms = () => {
    return dispatch => {
        Axios.get('http://localhost:8000/chatroom', {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
        })
        .then(response => {
            dispatch({
                type: GET_CHATROOMS,
                payload: response.data
            })
            console.log("Data Response", response.data)
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const addChatrooms = (name) => {
    return dispatch => {
        Axios.post('http://localhost:8000/chatroom',{ name },{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            }
        })
        .then(response => console.log("Room added Succesfully"))
        .catch(err => {
            console.log(err);
        })
    }
}