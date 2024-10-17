import React, { useState } from 'react';
import ClientSignUpForm from './SignUpForm';
import HotelierSignUpForm from './SignUpFormHotel';
import './SignUpForm.css';

const RegistrationPage = () => {
    const [role, setRole] = useState('client');

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className="registration-page">
            <h1>Inscription</h1>
            <div className="role-selection">
                <label>
                    <input type="radio" name="role" value="client" checked={role === 'client'} onChange={handleRoleChange} />
                    Client
                </label>
                <label>
                    <input type="radio" name="role" value="hotel" checked={role === 'hotel'} onChange={handleRoleChange} />
                    Hôtelier
                </label>
            </div>

            {role === 'client' ? <ClientSignUpForm /> : <HotelierSignUpForm />}
        </div>
    );
};

export default RegistrationPage;
