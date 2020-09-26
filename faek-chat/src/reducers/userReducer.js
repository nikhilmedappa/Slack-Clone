import {
    LOGIN,
    LOGOUT,
    SIGNUP,
    LOGIN_DETAILS
} from "../actions/types"



const initialState = {
    email: null,
    usertoken: null,
    isLoggedin: false
    
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                usertoken: action.payload,
                isLoading: false,
                isLoggedin: true
            }
        case LOGIN_DETAILS:
            return {
                ...state,
                email: action.payload,
                isLoading: false,
                isLoggedin: true
            }
        case LOGOUT:
            return {
                ...state,
                email: null,
                usertoken: null,
                isLoading: false,
                isLoggedin: false
            }
        case SIGNUP:
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                usertoken: action.token,
                isLoading: false,
                isLoggedin: true
            }
            default:
            return state;
    }
}

export default reducer;