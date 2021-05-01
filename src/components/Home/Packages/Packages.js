import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PackageCard from '../PackageCard/PackageCard';
import './Packages.css';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        fetch('https://ph-travelbd.herokuapp.com/firstSixPackage')
            .then(res => res.json())
            .then(data => setPackages(data))
    }, []);

    return (
        <section className="packages" id="packages">
            <Container>
                <div className="section__top text-center">
                    <h3>Our Packages</h3>
                    <h2>Destination</h2>
                </div>
                <div className="package">
                    {
                        packages.map(tourPackage => <PackageCard tourPackage={tourPackage} key={tourPackage._id} />)
                    }
                </div>
                <div className="text-center">
                    <Link className="mt-5 btn__primary package__btn" to="/packages">View All Packages</Link>
                </div>
            </Container>
        </section>
    );
};

export default Packages;