import { fetchSinToken, fetchConToken } from '../helpers/fetchApi';
import { types } from '../types/types';
import { IUser } from '../reducers/authReducer';

export const startLogin = (email: string, password: string) => {
    return async (dispatch: any) => {
        const body = await fetchSinToken('user/login', { email, password }, 'POST');
        if (!body) {
            dispatch(checkingFinish());
            return;
        }
        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', (new Date().getTime()).toString());
            dispatch(login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            dispatch(checkingFinish());
        }
    }
}

const login = (user: IUser) => ({
    type: types.authLogin,
    payload: user
})
const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startChecking = () => {
    return async (dispatch: any) => {
        const body = await fetchConToken('user/renew');
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}


export const startLogout = () => {
    return (dispatch: any) => {

        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');

        dispatch(logout());

    }
}

const logout = () => ({
    type: types.authLogout
})