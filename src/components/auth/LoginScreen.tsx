import React from 'react';
import './loginStyle.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';

const initLoginState = {
    email: '',
    password: '',
}

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm(initLoginState);
    const { email, password } = formValues;
    const dispatch = useDispatch()

    const handleLoginSubmit = (e: any) => {
        e.preventDefault();
        dispatch(startLogin(email, password))
    }

    return (
        <div className="login-main-container">
            <div className="login-container">
                <div className="login">
                    <h1>Login</h1>
                    <form onSubmit={handleLoginSubmit} autoComplete="off">
                        <input className="loginInput" type="text" name="email" value={email} onChange={handleInputChange} placeholder="Email" required />
                        <input className="loginInput" type="password" name="password" value={password} onChange={handleInputChange} placeholder="Contraseña" required />
                        <button type="submit" className="btn btn-primary btn-block btn-large">Iniciar sesión.</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
