import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './Testimonials.css';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Pagination]);

const swiperSettings = {
    spaceBetween: 20,
    slidesPerView: 3,
    pagination: {
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        fetch('https://ph-travelbd.herokuapp.com/testimonials')
            .then(res => res.json())
            .then(data => setTestimonials(data))
    }, []);

    return (
        <section className="testimonials">
            <Container>
                <div className="section__top text-center">
                    <h3>Our Clients Says</h3>
                    <h2>Testimonials</h2>
                </div>
                <div className="testimonial__slider">
                    {(testimonials.length > 0) &&
                        <Swiper {...swiperSettings} >
                            {
                                testimonials.map(testimonial => <SwiperSlide key={testimonial._id}><TestimonialCard testimonial={testimonial} /></SwiperSlide>)
                            }
                        </Swiper>
                    }
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;