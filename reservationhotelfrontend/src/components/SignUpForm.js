import React, { useState } from 'react';
import './SignUpForm.css';
import Swal from 'sweetalert2';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        telephone: '',
        adresse: '',
        role: 'client', // Valeur par défaut
        nombre_etoiles: '',
        description: '',
        logo: null,
        hotelNom: '',
    });

    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, logo: e.target.files[0] }));
        setErrors((prevErrors) => ({ ...prevErrors, logo: '' }));
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis.';
        if (!formData.email.trim()) newErrors.email = 'L\'email est requis.';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'L\'email doit être valide.';
        if (!formData.password.trim()) newErrors.password = 'Le mot de passe est requis.';
        if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
        if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis.';
        if (!/^\+?\d{8,15}$/.test(formData.telephone)) newErrors.telephone = 'Le numéro de téléphone doit être valide.';
        if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise.';

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (formData.role === 'hotel') {
            if (!formData.hotelNom.trim()) newErrors.hotelNom = 'Le nom de l\'hôtel est requis.';
            if (!formData.nombre_etoiles.trim()) newErrors.nombre_etoiles = 'Le nombre d\'étoiles est requis.';
            if (isNaN(formData.nombre_etoiles) || formData.nombre_etoiles < 1 || formData.nombre_etoiles > 5) {
                newErrors.nombre_etoiles = 'Le nombre d\'étoiles doit être un nombre entre 1 et 5.';
            }
            if (!formData.description.trim()) newErrors.description = 'La description est requise.';
            if (formData.description.length < 10) newErrors.description = 'La description doit contenir au moins 10 caractères.';
            if (!formData.logo) newErrors.logo = 'Le logo est requis.';
        }

        return newErrors;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (step === 1) {
            validationErrors = validateStep1();
        } else if (step === 2) {
            validationErrors = validateStep2();
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStep((prevStep) => prevStep + 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Une erreur est survenue');
            }

            const data = await response.json();
            console.log(data.message);
            Swal.fire('Succès!', 'Inscription réussie!', 'success');
            setFormData({
                nom: '',
                email: '',
                password: '',
                telephone: '',
                adresse: '',
                role: 'client',
                nombre_etoiles: '',
                description: '',
                logo: null,
                hotelNom: '',
            }); // Reset form data after successful registration
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error.message);
            Swal.fire('Erreur!', error.message, 'error');
        }
    };

    return (
        <form onSubmit={step === 2 ? handleSubmit : handleNextStep} className="registration-form">
            <h2>Inscription</h2>
            {step === 1 && (
                <>
                    <div className="form-group">
                        <label htmlFor="role">Rôle</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange}>
                            <option value="client">Client</option>
                            <option value="hotel">Hôtel</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                        {errors.nom && <p className="error">{errors.nom}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Téléphone</label>
                        <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} />
                        {errors.telephone && <p className="error">{errors.telephone}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} />
                        {errors.adresse && <p className="error">{errors.adresse}</p>}
                    </div>
                    <button type="submit">Suivant</button>
                </>
            )}

            {step === 2 && (
                <>
                    {formData.role === 'hotel' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="hotelNom">Nom de l'Hôtel</label>
                                <input type="text" id="hotelNom" name="hotelNom" value={formData.hotelNom} onChange={handleChange} />
                                {errors.hotelNom && <p className="error">{errors.hotelNom}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre_etoiles">Nombre d'Étoiles</label>
                                <input type="number" id="nombre_etoiles" name="nombre_etoiles" value={formData.nombre_etoiles} onChange={handleChange} />
                                {errors.nombre_etoiles && <p className="error">{errors.nombre_etoiles}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                                {errors.description && <p className="error">{errors.description}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="logo">Logo</label>
                                <input type="file" id="logo" name="logo" accept="image/*" onChange={handleFileChange} />
                                {errors.logo && <p className="error">{errors.logo}</p>}
                            </div>
                        </>
                    )}
                    <button type="submit">S'inscrire</button>
                </>
            )}
               <p className="signup-link">
          Pas de compte ? <a href="/connexion">Inscrivez-vous ici</a>
        </p>
        </form>
        
    );
};

export default RegistrationForm;
