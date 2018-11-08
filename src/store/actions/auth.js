import * as actionTypes from "./actionTypes";

const login_success = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS
    };
};

const login_fail = (err) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        msg: err
    };
};


export const login = (username, password) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(username, password);
        const firebase = getFirebase();
        //dispatch(loginStart());
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(res => dispatch(login_success()))
            .catch(err => dispatch(login_fail(err.message)));
    };
};
