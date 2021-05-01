import React, { useEffect, useState } from 'react';
import AdminCard from '../AdminCard/AdminCard';
import './MakeAdmin.css';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const MakeAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        loadAllAdmin();
    }, []);

    const loadAllAdmin = () => {
        fetch('https://ph-travelbd.herokuapp.com/admins')
            .then(res => res.json())
            .then(data => setAdmins(data))
    };

    const handleAddAdmin = data => {
        fetch('https://ph-travelbd.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadAllAdmin();
                    toast.success('New Admin Added!');
                    reset();
                };
            });
    };

    return (
        <div className="makeAdmin">
            <div className="makeAdmin__content">
                <form onSubmit={handleSubmit(handleAddAdmin)} className="makeAdmin__form">
                    <div className="package__group">
                        <label htmlFor="email">Email Address</label>
                        <div className="admin__group--box">
                            <input type="email" id="email" {...register("email", { required: '*Email Address is required' })} />
                            <button type="submit" className="btn__primary package__btn">Make Admin</button>
                        </div>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                </form>
                <div className="makeAdmin__wrapper scrollbar">
                    <table className="dashboard__table">
                        <thead>
                            <tr>
                                <th>Sl.</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admins.map((admin, ind) => <AdminCard admin={admin} sl={ind + 1} loadAllAdmin={loadAllAdmin} key={admin._id} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;