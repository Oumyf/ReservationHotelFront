import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD'); // Ajustez la devise si nécessaire

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/payment', {
        amount,
        currency,
        paymentMethodId: 'YOUR_PAYMENT_METHOD_ID', // Ajoutez ici le moyen de paiement
      });

      console.log('Paiement réussi:', response.data);
      alert('Paiement réussi!');
    } catch (error) {
      console.error('Erreur de paiement:', error);
      alert('Erreur lors du paiement');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Montant:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Devise:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            {/* Ajoutez d'autres devises si nécessaire */}
          </select>
        </label>
      </div>
      <button type="submit">Payer</button>
    </form>
  );
};

export default PaymentForm;
