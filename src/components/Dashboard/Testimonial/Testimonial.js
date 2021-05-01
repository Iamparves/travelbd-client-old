import React, { useContext, useEffect, useState } from 'react';
import './Testimonial.css';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../contexts/UserContext';
import toast from 'react-hot-toast';

const Testimonial = () => {
    const { user } = useContext(UserContext);
    const { email, photo } = user;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [testimonials, setTestimonials] = useState([]);

    const loadTestimonials = () => {
        fetch(`https://ph-travelbd.herokuapp.com/testimonials?email=${email}`)
            .then(res => res.json())
            .then(data => setTestimonials(data))
    }

    useEffect(() => {
        loadTestimonials();
        // eslint-disable-next-line
    }, [email]);

    const handleTestimonialSubmit = data => {
        const testimonial = { ...data, email, image: photo };
        fetch('https://ph-travelbd.herokuapp.com/addTestimonial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testimonial)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadTestimonials();
                    toast.success('Testimonial Submitted!');
                    reset();
                };
            });
    };

    const handleTestimonialDelete = (id) => {
        fetch(`https://ph-travelbd.herokuapp.com/deleteTestimonial/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadTestimonials();
                    toast.error('Testimonial Deleted!')
                    reset();
                };
            });
    };

    return (
        <div className="testimonial">
            <div className="testimonial__contents">
                <form onSubmit={handleSubmit(handleTestimonialSubmit)} className="testimonial__form">
                    <div className="package__group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" {...register("name", { required: '*Name is required' })} />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div className="package__group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" id="description" {...register("description", { required: '*Description is required' })}></textarea>
                        {errors.description && <span>{errors.description.message}</span>}
                    </div>
                    <button type="submit" className="btn__primary package__btn">Submit</button>
                </form>
            </div>
            {
                (testimonials.length > 0) && <div className="testimonial__cards">
                    <h2 className="title">My Testimonials</h2>
                    {
                        testimonials.map(testimonial => (
                            <div className="testimonialCard" key={testimonial._id}>
                                <h2 className="name">{testimonial.name}</h2>
                                <p className="description">{testimonial.description}</p>
                                <button onClick={() => { handleTestimonialDelete(testimonial._id) }} className="btn__primary package__btn">Delete</button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Testimonial;