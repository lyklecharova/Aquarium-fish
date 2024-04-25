import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


import { AuthContext } from '../../contexts/authContext';
import * as userService from '../../../service/userService';
import style from './Login.module.css'

export const Login = () => {
    const { isLog, isAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    if (isLog) {

        return <Navigate to="/" />
    }

    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const onChangeLogin = (e) => {
        const { name, value } = e.target;
        setLogin((login) => ({
            ...login,
            [name]: value,
        }))
    }

    const onSubmitLoginHander = async (e) => {
        e.preventDefault();
        // Checking if the email and password fields are empty
        if (login.email.trim() === "" || login.password.trim() === "") {
            // Setting an error message if either field is empty
            setErrorMessage('Please fill in all fields.');
            return;
        }
        try {
            const loginInformation = await userService.login(login);
            // Assuming login information indicates successful login
            if (loginInformation) {
                localStorage.setItem("UserInfo", JSON.stringify(loginInformation));
                // Update authentication state
                isAuthenticated(loginInformation);
                console.log("Login successful:", loginInformation);
                // Redirect to home page after successful login
                navigate('/');
            } else {
                // If login information is null or false, indicating unsuccessful login
                setError(true);
                setErrorMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(true);
            setErrorMessage('Login failed. Please try again.');
        }
    }

    return (
        <div className={style['form-container']}>
            <form onSubmit={onSubmitLoginHander} method="post" className={style['form']}>
                <div className={style['for-login']}>
                    <label htmlFor="email" className={style['lable-email']}>Email</label>
                    <input
                        className={style['input']}
                        type="email"
                        name="email"
                        id="email"
                        onChange={onChangeLogin}
                        value={login.email}
                        required={true}
                        autoComplete="email"
                        placeholder="Email..."
                    />
                </div>


                <div className={style['for-password']}>
                    <label htmlFor="password" className={style['lable-password']}>Password</label>
                    <input
                        className={style['input']}
                        type="password"
                        name="password"
                        id="password"
                        onChange={onChangeLogin}
                        value={login.password}
                        required={true}
                        autoComplete="password"
                        placeholder="Password..."
                    />
                </div>

                {error && <p className={style['error']}>Invalid email or password</p>}
                <button type="submit" defaultValue="Login" className={style['button']}>Login</button>

            </form>
        </div>
    );
}