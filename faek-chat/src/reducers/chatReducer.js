import {
    GET_CHATROOMS
} from "../actions/types"

const initialState = {
    chatrooms: [],  
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHATROOMS:
            return {
                ...state,
                chatrooms: action.payload,
                isLoading: false,
                getchatroom: true
            }
            default:
            return state;
    }
}

export default reducer;