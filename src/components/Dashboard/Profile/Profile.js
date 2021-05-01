import React, { useContext } from 'react';
import './Profile.css';
import { UserContext } from '../../../contexts/UserContext';
import { logOutUser } from '../../Login/LoginManager';
import { useHistory } from 'react-router';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const { name, email, photo } = user;
    const history = useHistory();

    const handleLogout = () => {
        logOutUser()
            .then(res => {
                setUser(res);
                toast.error('Logged out!');
                history.push("/");
            });
    };

    return (
        <div className="profile">
            <div className="profile__content">
                <div className="user__card">
                    <img src={photo} alt={name} className="user__img" />
                    <h2 className="user__name">{name}</h2>
                    <h3 className="user__email">{email}</h3>
                    <button className="package__btn btn__primary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;