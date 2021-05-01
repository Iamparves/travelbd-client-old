import React, { useContext } from 'react';
import './Login.css';
import { Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { googleSignIn, initLoginFramework, setJWTToken } from './LoginManager';
import GoogleIcon from '../../img/icon/google.png';
import toast from 'react-hot-toast';

initLoginFramework();

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleSocialSignIn = signInMethod => {
        signInMethod()
            .then(res => {
                setUser(res);
                setJWTToken();
                toast.success('Login Successful!');
                history.replace(from);
            })
            .catch(err => handleError(err.message));
    };

    const handleError = errorMessage => {
        setUser({
            isLoggedIn: false,
            error: errorMessage
        });
    };

    return (
        <section className="login">
            <Container>
                <div className="login__inner">
                    <h2>Login</h2>
                    {
                        user.error && <p className="login__error">{user.error}</p>
                    }
                    <div className="login__social--box">
                        <button onClick={() => handleSocialSignIn(googleSignIn)} className="login__social btn"><img src={GoogleIcon} alt="Google" /><span>Continue with Google</span></button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Login;