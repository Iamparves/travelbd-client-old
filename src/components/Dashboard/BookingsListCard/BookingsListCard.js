import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookingsListCard = ({ booking, loadAllBookings, ind }) => {
    const { _id, tourPackage, email, paymentMethod, status, billing_details: { name } } = booking;
    const [statusVisible, setStatusVisible] = useState(false);

    const handleStatusChange = (e) => {
        const orderStatus = e.target.value;
        fetch(`https://ph-travelbd.herokuapp.com/updateBooking/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: orderStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadAllBookings();
                    toast.success(`Status Changed to ${orderStatus}`);
                    setStatusVisible(false);
                };
            });
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{tourPackage.name}</td>
            <td>{email}</td>
            <td>{paymentMethod}</td>
            <td className="status__box">
                <button onClick={() => setStatusVisible(true)} className={`${status}`}>{status} <span><FontAwesomeIcon icon={faChevronDown} /></span></button>
                <form onChange={handleStatusChange}>
                    <div className={`status__labels ${statusVisible ? 'visible' : ''}`} onClick={() => setStatusVisible(false)}>
                        <label htmlFor={`pending${ind}`}>Pending</label>
                        <label htmlFor={`ongoing${ind}`}>On going</label>
                        <label htmlFor={`done${ind}`}>done</label>
                    </div>
                    <div className="status__inputs d-none">
                        <input name="status" id={`pending${ind}`} type="radio" value="pending" />
                        <input name="status" id={`ongoing${ind}`} type="radio" value="on going" />
                        <input name="status" id={`done${ind}`} type="radio" value="done" />
                    </div>
                </form>
            </td>
        </tr>
    );
};

export default BookingsListCard;