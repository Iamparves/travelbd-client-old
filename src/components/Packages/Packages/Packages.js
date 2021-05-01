import React, { useEffect, useState } from 'react';
import './Packages.css';
import { Container } from 'react-bootstrap';
import PackageCard from '../../Home/PackageCard/PackageCard';
import PageBanner from '../../Shared/PageBanner/PageBanner';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        fetch('https://ph-travelbd.herokuapp.com/packages')
            .then(res => res.json())
            .then(data => setPackages(data))
    }, []);

    return (
        <section className="packagesPage">
            <PageBanner name="Packages" />
            <Container>
                <div className="package packagesPage__content">
                    {
                        packages.map(tourPackage => <PackageCard tourPackage={tourPackage} key={tourPackage._id} />)
                    }
                </div>
            </Container>
        </section>
    );
};

export default Packages;