import * as actionTypes from "../actions/actionTypes";

const initialState = {
    authStatus: false,
    errorMessage: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authStatus: true
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                authStatus: false,
                errorMessage: action.msg
            };

        default:
            return state;
    }

};

export default reducer;
