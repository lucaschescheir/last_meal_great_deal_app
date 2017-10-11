import axios from 'axios';
const ROOT_URL = 'http://localhost:3090/';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types'

export function signinUser({ email, password }) {
    return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}signin`, { email, password })
    .then(response => {

        // if requet is good
        // update state to user //authenticated
        dispatch({ type: AUTH_USER });
        //save jwt token
        localStorage.setItem('token', response.data.token)
        //redireect to the route /feature
        browserHistory.push('/feature');
    })
    .catch(()=>{
        //if request is bad show error
        //show an error to user
        console.log('badLogin')
        dispatch(authError('Bad Login Info'))
    })
        }
}
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
        localStorage.removeItem('token')
}
