import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import * as userService from '../../../service/userService';
import style from './Register.module.css';

export const Register = () => {
    const { isLog } = useContext(AuthContext);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    if (isLog) {
        return <Navigate to="/" />
    }
    const [register, setRegister] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChangeRegister = (e) => {
        const { name, value } = e.target;
        setRegister((prevRegister) => ({
            ...prevRegister,
            [name]: value,
        }));
    };



    const onSubmitRegisterHandler = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = register;

        // Check for empty fields
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setError('Passwords  do not match.');
            return;
        }

        try {
            // Check if user already exists with the same email
            const userExists = await userService.register(register);

            // // Redirect to home page after successful registration
            // navigate('/');
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            // Handle registration failure
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className={style['form-container']}>
            <form onSubmit={onSubmitRegisterHandler} method="post" className={style['form']}>
                <div className={style['for-login']}>
                    <label htmlFor="email" className={style['lable-email']}>Email</label>
                    <input
                        className={style['input']}
                        type="email"
                        name="email"
                        id="email"
                        onChange={onChangeRegister}
                        value={register.email}
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
                        onChange={onChangeRegister}
                        value={register.password}
                        required={true}
                        autoComplete="password"
                        placeholder="Password..."
                    />
                </div>

                <div className={style['for-password']}>
                    <label htmlFor="confirmPassword" className={style['label-password']}>Confirm Password</label>
                    <input
                        className={style['input']}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={onChangeRegister}
                        value={register.confirmPassword}
                        required={true}
                        autoComplete="confirm-password"
                        placeholder="Confirm Password..."
                    />
                </div>
                {error && <p className={style['error']}>{error}</p>}
                <button type="submit" defaultValue="Login" className={style['button']}>Register</button>
            </form>
        </div>
    );
};
