import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { reduxFirestore, getFirestore, firestoreReducer } from "redux-firestore";
import { reactReduxFirebase, getFirebase, firebaseReducer } from "react-redux-firebase";
import firebaseconfig from "./config/firebase-config.js";
import authReducer from "./store/reducers/auth.js";
//import dataReducer from "./store/reducers/data.js";
import App from './App';

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    //project: dataReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebaseconfig),
        reactReduxFirebase(firebaseconfig, {
            userProfile: 'users',
            useFirestoreForProfile: true
        }))
);

const app = (
    <Provider store={store}>
    <App/>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
