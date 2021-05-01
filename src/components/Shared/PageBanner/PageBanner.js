import React from 'react';
import './PageBanner.css';
import { Container } from 'react-bootstrap';

const PageBanner = ({ name }) => {
    return (
        <div className="banner">
            <Container>
                <h1>{name}</h1>
            </Container>
        </div>
    );
};

export default PageBanner;