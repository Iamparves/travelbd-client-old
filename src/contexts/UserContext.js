import { createContext, useState } from 'react';
import jwt_decode from "jwt-decode";
import { getUserRole } from '../components/Login/LoginManager';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState({ isLoggedIn: false });
    const token = localStorage.getItem('token');

    const getDecodedToken = () => {
        try {
            return jwt_decode(token);
        } catch (err) {
            localStorage.setItem('token', '');
            return console.log(err)
        }
    };

    const currentUser = async (user) => {
        const { name, email, picture } = user;
        const isAdmin = await getUserRole(email);

        const userInfo = {
            isLoggedIn: true,
            name: name,
            email: email,
            photo: picture,
            isAdmin: isAdmin,
            error: ""
        };

        setUser(userInfo);
    };

    if (!user.isLoggedIn && token) {
        const decodedUser = getDecodedToken();
        if (decodedUser) currentUser(decodedUser);
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;