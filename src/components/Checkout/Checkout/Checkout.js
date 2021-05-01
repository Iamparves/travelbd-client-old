import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Checkout = () => {
    const { id } = useParams();
    const [tourPackage, setTourPackage] = useState({});
    const stripePromise = loadStripe('pk_test_51IeGhAAGbr5Hd35pxBRLnJbyBUalhCooRWQkGVcuDi6FlMogEFdLbl1HvH1pqYtqbgoMlYqEQsXLHL0LxinPiYvb00fCbKK9Ht');

    useEffect(() => {
        fetch(`https://ph-travelbd.herokuapp.com/getPackage/${id}`)
            .then(res => res.json())
            .then(data => setTourPackage(data))
    }, [id]);


    return (
        <section className="checkout">
            <Container>
                <div className="checkout__package">
                    <h2>Checkout</h2>
                    <table className="checkout__table">
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{tourPackage.name}</td>
                                <td>${tourPackage.price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="checkout__content">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm tourPackage={tourPackage} />
                    </Elements>
                </div>
            </Container>
        </section>
    );
};

export default Checkout;