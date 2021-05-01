import React from 'react';
import './ContactInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';

const ContactInfo = ({ info }) => {
    const { icon, title, description } = info;

    return (
        <Col md="4">
            <div className="contact__info text-center">
                <span><FontAwesomeIcon icon={icon} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </Col>
    );
};

export default ContactInfo;