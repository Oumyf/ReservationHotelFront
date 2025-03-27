import React, { useState } from 'react';
// import './Payment.css'; // Assurez-vous que ce chemin est correct
import SweetAlert from 'sweetalert2'; // Assurez-vous d'installer SweetAlert

const Payment = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        bookingId: '', // ID de la réservation
        amount: 0, // Montant à payer
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Le nom est requis.';
        }
        if (!formData.customerPhone.trim()) {
            newErrors.customerPhone = 'Le numéro de téléphone est requis.';
        } else if (!/^\+?\d{8,15}$/.test(formData.customerPhone)) {
            newErrors.customerPhone = 'Le numéro de téléphone doit être valide.';
        }
        if (!formData.bookingId.trim()) {
            newErrors.bookingId = 'L\'ID de réservation est requis.';
        }
        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = 'Un montant valide est requis.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/payment/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: formData.amount,
                    customerPhone: formData.customerPhone,
                    customerName: formData.customerName,
                    bookingId: formData.bookingId,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'initiation du paiement.');
            }

            const data = await response.json();

            // Afficher une alerte de succès
            SweetAlert.fire({
                title: 'Succès!',
                text: data.message || 'Le paiement a été initié avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Réinitialiser le formulaire ou rediriger l'utilisateur si nécessaire
            setFormData({
                customerName: '',
                customerPhone: '',
                bookingId: '',
                amount: 0,
            });

        } catch (error) {
            console.error('Erreur lors de l\'initiation du paiement :', error);
            SweetAlert.fire({
                title: 'Erreur!',
                text: error.message || 'Erreur lors de l\'initiation du paiement. Veuillez réessayer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="booking-container">
            <h2>Réserver un hôtel</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="customerName"
                    placeholder="Nom du client"
                    value={formData.customerName}
                    onChange={handleChange}
                />
                {errors.customerName && <span className="error-message">{errors.customerName}</span>}

                <input
                    type="text"
                    name="customerPhone"
                    placeholder="Téléphone du client"
                    value={formData.customerPhone}
                    onChange={handleChange}
                />
                {errors.customerPhone && <span className="error-message">{errors.customerPhone}</span>}

                <input
                    type="text"
                    name="bookingId"
                    placeholder="ID de réservation"
                    value={formData.bookingId}
                    onChange={handleChange}
                />
                {errors.bookingId && <span className="error-message">{errors.bookingId}</span>}

                <input
                    type="number"
                    name="amount"
                    placeholder="Montant"
                    value={formData.amount}
                    onChange={handleChange}
                />
                {errors.amount && <span className="error-message">{errors.amount}</span>}

                <button type="submit">Payer</button>
            </form>
        </div>
    );
};

export default Payment;
