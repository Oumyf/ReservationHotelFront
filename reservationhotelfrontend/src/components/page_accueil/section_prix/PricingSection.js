import React from 'react';
import './PricingSection.css';

const PricingSection = () => {
  return (
    <section className="pricing-section">
      <h2>Our Pricing Plans</h2>
      <div className="pricing">
        <div className="price-plan">
          <h3>Basic Plan</h3>
          <p>$100 per night</p>
        </div>
        <div className="price-plan">
          <h3>Standard Plan</h3>
          <p>$150 per night</p>
        </div>
        <div className="price-plan">
          <h3>Advanced Plan</h3>
          <p>$200 per night</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
