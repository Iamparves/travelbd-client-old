import React, { useEffect, useState } from 'react';
import BookingsListCard from '../BookingsListCard/BookingsListCard';
import './BookingsList.css';

const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        loadAllBookings();
    }, []);

    const loadAllBookings = () => {
        fetch('https://ph-travelbd.herokuapp.com/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
    };

    return (
        <div className="bookingsList">
            <div className="bookingsList__content scrollbar">
                <div className="bookingsList__inner">
                    <table className="dashboard__table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Package</th>
                                <th>Email</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking, ind) => <BookingsListCard booking={booking} ind={ind} loadAllBookings={loadAllBookings} key={booking._id} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingsList;