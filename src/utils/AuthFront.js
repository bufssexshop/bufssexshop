import { history } from '../utils/history';

export const AuthFront = (error) => {
  if(error.response !== undefined && error.response.request.status === 401){
    alert("Su sesión expiró, ingrese nuevamente.")
    localStorage.removeItem('user-bufs');
    localStorage.removeItem('token-bufs');
    history.push('/home')
  }
}
