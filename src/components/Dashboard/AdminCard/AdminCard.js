import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import toast from 'react-hot-toast';

const AdminCard = ({ loadAllAdmin, admin, sl }) => {
    const { _id, email } = admin;

    const handleAdminRemove = () => {
        fetch(`https://ph-travelbd.herokuapp.com/removeAdmin/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadAllAdmin();
                    toast.error('Admin Removed!')
                };
            });
    };

    return (
        <tr>
            <td>{sl}</td>
            <td>{email}</td>
            <td>
                <button onClick={handleAdminRemove} className="delete__btn"><FontAwesomeIcon icon={faTrash} /></button>
            </td>
        </tr>
    );
};

export default AdminCard;