import React from 'react';
import './PricingSection.css'; // Assurez-vous de créer un fichier CSS pour la mise en forme

const PricingSection = () => {
  return (
    <section className="pricing-section">
      <h2>Vous voulez devenir un hotel partenaire?</h2>
      <p>Choisissez votre plan</p>
      <div className="plans-container">
        {/* Plan Basique */}
        <div className="plan-card">
          <h3>Basique</h3>
          <p>Pack</p>
          <h4>70 000 FCFA</h4>
          <p>/mois</p>
          <ul>
            <li>Référencement de l'hôtel</li>
            <li>Visibilité limitée</li>
            <li>Analyses de base</li>
            <li>Gestion des réservations Simple</li>
            <li>Email Announcement</li>
          </ul>
          <button>Souscrire</button>
        </div>

        {/* Plan Standard */}
        <div className="plan-card">
          <h3>Standard</h3>
          <p>Pack</p>
          <h4>100 000 FCFA</h4>
          <p>/mois</p>
          <ul>
            <li>Visibilité améliorée</li>
            <li>Analyses avancées</li>
            <li>Promotion dans les campagnes</li>
            <li>Gestion des réservations Avancée</li>
            <li>Avis des clients</li>
            <li>Support client Privilégié</li>
          </ul>
          <button>Souscrire</button>
        </div>

        {/* Plan Avancé */}
        <div className="plan-card">
          <h3>Avancé</h3>
          <p>Pack</p>
          <h4>475 000 FCFA</h4>
          <p>/an</p>
          <ul>
            <li>Visibilité maximale</li>
            <li>Analyses complètes</li>
            <li>Promotions exclusives</li>
            <li>Programme de fidélité</li>
            <li>Gestion avancée des réservations</li>
            <li>Annonces par Mail</li>
            <li>Gestionnaire de compte dédié</li>
            <li>Support client 24/7</li>
          </ul>
          <button>Souscrire</button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
