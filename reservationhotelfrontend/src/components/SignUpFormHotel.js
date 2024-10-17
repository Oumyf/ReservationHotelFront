import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpFormHotel = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        telephone: '',
        adresse: '',
        nombre_etoiles: '',
        description: '',
        logo: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Reset error when user types
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, logo: e.target.files[0] });
        setErrors({ ...errors, logo: '' }); // Reset error when file is chosen
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== 'logo') {
                newErrors[key] = 'Ce champ est requis';
            }
        });
        if (formData.nombre_etoiles < 1 || formData.nombre_etoiles > 5) {
            newErrors.nombre_etoiles = 'Le nombre d\'étoiles doit être entre 1 et 5';
        }

         // Validation pour le mot de passe
    if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    }

    // Validation pour le téléphone
    if (formData.telephone.length !== 9) {
        newErrors.telephone = 'Le téléphone doit contenir exactement 9 chiffres.';
    }
    if (formData.description.length < 10 || formData.description.length > 255) {
        newErrors.description = 'La description doit être entre 10 et 255';
    }
    return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // Stop if there are errors

        setLoading(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch('http://localhost:8000/api/register/hotel', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    // 'Content-Type' is automatically set for FormData
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue');
            }

            alert(data.message || 'Inscription réussie !');
            setFormData({
                nom: '',
                email: '',
                password: '',
                telephone: '',
                adresse: '',
                nombre_etoiles: '',
                description: '',
                logo: null,
            }); // Reset form
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Inscription Hôtel</h2>
            {Object.entries(formData).map(([key, value]) => (
                <div className="form-group" key={key}>
                    <label htmlFor={key}>{key === 'nom' ? 'Nom de l\'Hôtel' : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    {key === 'description' ? (
                        <textarea id={key} name={key} value={value} onChange={handleChange} />
                    ) : key === 'logo' ? (
                        <input type="file" id={key} name={key} accept="image/*" onChange={handleFileChange} />
                    ) : (
                        <input type={key === 'password' ? 'password' : 'text'} id={key} name={key} value={value} onChange={handleChange} />
                    )}
                    {errors[key] && <p className="error">{errors[key]}</p>}
                </div>
            ))}
            <button type="submit" disabled={loading}>
                {loading ? 'Enregistrement...' : "S'inscrire"}
            </button>
        </form>
    );
};

export default SignUpFormHotel;
