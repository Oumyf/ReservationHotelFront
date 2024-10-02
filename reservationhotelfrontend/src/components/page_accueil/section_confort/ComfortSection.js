import React from 'react';
import './ComfortSection.css';

const ComfortSection = () => {
  return (
    <section className="confort">
    <h2>Confort Assuré</h2>
    <div className="cards">
        <div className="card1">
            <div className="arriere_plan">
                <span className="texte">Suite</span>
            </div>
        </div>
        <div className="card2">
            <div className="arriere_plan">
                <span className="texte">Piscine</span>
            </div>
        </div>
        <div className="card3">
            <div className="arriere_plan">
                <span className="texte">Chambre</span>
            </div>
        </div>
    </div>
</section>
  );
};

export default ComfortSection;
