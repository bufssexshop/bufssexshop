import axios from 'axios';
import { AuthFront } from '../utils/AuthFront';

export const SAVE_USER = 'SAVE_USER'
export const USER_ERROR = 'USER_ERROR'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_LOADING = 'USER_LOADING'
export const USER_FINISHED = 'USER_FINISHED'
export const USERS_SUCCESS = 'USERS_SUCCESS'

export function getUser() {
  return async function(dispatch){
    dispatch({ type: USER_LOADING })
    dispatch({ type: USER_ERROR, payload: '' })
    try {
      const token = localStorage.getItem('token-bufs')

      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/usuarios/usuario',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: USER_SUCCESS, payload: data.user})
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error })
      AuthFront(error);
    } finally {
      dispatch({ type: USER_FINISHED })
    }
  }
}

const initialState = {
  user: {},
  loading: false,
  error: null,
  users: []
}

export function UserReducer(state = initialState, action){
  switch(action.type) {

    case USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case USER_FINISHED:
      return {
        ...state,
        loading: false,
      }
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      }


    default:
      return state
  }
}