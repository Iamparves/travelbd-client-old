import React, { useEffect, useState } from 'react';
import ManagePackageCard from '../ManagePackageCard/ManagePackageCard';
import './ManagePackages.css';

const ManagePackages = () => {
    const [packages, setPackages] = useState([]);

    const loadAllPackages = () => {
        fetch('https://ph-travelbd.herokuapp.com/packages')
            .then(res => res.json())
            .then(data => setPackages(data))
    };

    useEffect(() => {
        loadAllPackages();
    }, []);

    return (
        <div className="managePackages">
            <div className="managePackages__content scrollbar">
                <div className="managePackage__inner">
                    <table className="dashboard__table">
                        <thead>
                            <tr>
                                <th>Sl.</th>
                                <th>Package Name</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                packages.map((tourPackage, ind) => <ManagePackageCard tourPackage={tourPackage} sl={ind + 1} loadAllPackages={loadAllPackages} key={tourPackage._id} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagePackages;