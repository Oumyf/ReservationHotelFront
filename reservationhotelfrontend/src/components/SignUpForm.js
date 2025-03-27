import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';

const SignUpFormClient = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        telephone: '',
        adresse: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Reset error when user types
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'Ce champ est requis';
            }
        });
        if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
        }
    
        // Validation pour le téléphone
        if (formData.telephone.length !== 9) {
            newErrors.telephone = 'Le téléphone doit contenir exactement 9 chiffres.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // Stop if there are errors

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/register/client', formData);
            alert(response.data.message || 'Inscription réussie !');
            setFormData({ nom: '', email: '', password: '', telephone: '', adresse: '' }); // Reset form
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Une erreur est survenue';
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <h2>Inscription Client</h2>
            {Object.entries(formData).map(([key, value]) => (
                <div className="form-group" key={key}>
                    <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input
                        type={key === 'password' ? 'password' : 'text'}
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required
                    />
                    {errors[key] && <p className="error">{errors[key]}</p>}
                </div>
            ))}
            <button type="submit" className="submit-button" disabled={loading} aria-label="S'inscrire">
                {loading ? 'Enregistrement...' : "S'inscrire"}
            </button>
        </form>
    );
};

export default SignUpFormClient;
