import { faChevronDown, faChevronUp, faList, faPlus, faQuoteLeft, faTasks, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import AddPackage from '../AddPackage/AddPackage';
import BookingsList from '../BookingsList/BookingsList';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManagePackages from '../ManagePackages/ManagePackages';
import MyBookings from '../MyBookings/MyBookings';
import Profile from '../Profile/Profile';
import Testimonial from '../Testimonial/Testimonial';
import './Dashboard.css';

const adminPages = [
    {
        name: 'Profile',
        path: 'profile',
        icon: faUser
    },
    {
        name: 'Bookings List',
        path: 'bookings',
        icon: faList
    },
    {
        name: 'Add Package',
        path: 'addPackage',
        icon: faPlus
    },
    {
        name: 'Manage Packages',
        path: 'managePackage',
        icon: faTasks
    },
    {
        name: 'Make Admin',
        path: 'makeAdmin',
        icon: faUserTie
    }
]

const customerPages = [
    {
        name: 'Profile',
        path: 'profile',
        icon: faUser
    },
    {
        name: 'My Bookings',
        path: 'myBookings',
        icon: faList
    },
    {
        name: 'Testimonial',
        path: 'testimonial',
        icon: faQuoteLeft
    },
]

const Dashboard = () => {
    const { path, url } = useRouteMatch();
    const activePath = useHistory().location.pathname.split('/')[2] || 'profile';
    const [active, setActive] = useState(activePath);
    const [sidebar, setSidebar] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        setActive(activePath);
        setSidebar(false);
    }, [activePath]);

    return (
        <section className="dashboard">
            <div className="dashboard__header">
                <Link className="logo" to="/">Travel BD</Link>
                <Link to={`${url}/profile`} className="img__box">
                    <img src={user.photo} alt={user.name} title={user.name} />
                </Link>
            </div>
            <div className="dashboard__inner">
                <div className="sidebar">
                    <button onClick={() => setSidebar(!sidebar)} className="sidebar__toggle">
                        {!sidebar ? 'Open menu' : 'Close menu'} <FontAwesomeIcon icon={!sidebar ? faChevronDown : faChevronUp} />
                    </button>
                    <nav className={`sidebar__nav ${sidebar ? 'visible' : ''}`}>
                        {
                            !user.isAdmin && customerPages.map(page => <Link to={`${url}/${page.path}`} className={active === page.path ? 'active' : ''} key={page.path}><span><FontAwesomeIcon icon={page.icon} /></span> {page.name}</Link>)
                        }
                        {
                            user.isAdmin && adminPages.map(page => <Link to={`${url}/${page.path}`} className={active === page.path ? 'active' : ''} key={page.path}><span><FontAwesomeIcon icon={page.icon} /></span> {page.name}</Link>)
                        }
                    </nav>
                </div>
                <div className="dashboard__content">
                    <Switch>
                        <Route exact path={`${path}/`}>
                            <Profile />
                        </Route>
                        <Route path={`${path}/profile`}>
                            <Profile />
                        </Route>
                        <Route path={`${path}/bookings`}>
                            <BookingsList />
                        </Route>
                        <Route path={`${path}/addPackage`}>
                            <AddPackage />
                        </Route>
                        <Route path={`${path}/managePackage`}>
                            <ManagePackages />
                        </Route>
                        <Route path={`${path}/makeAdmin`}>
                            <MakeAdmin />
                        </Route>
                        <Route path={`${path}/testimonial`}>
                            <Testimonial />
                        </Route>
                        <Route path={`${path}/myBookings`}>
                            <MyBookings />
                        </Route>
                    </Switch>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;