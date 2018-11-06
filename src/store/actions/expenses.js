import * as actionTypes from "./actionTypes.js";


export const createExpense = (expense) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        //console.log(firestore);
        firestore.collection('expenses').add({
                ...expense
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
};

export const deleteExpense = (d) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const id = d.data.id;
        firestore.collection('expenses').doc(id).delete();

    };
};
