import React from 'react';
import './TestimonialSection.css'; 
import fabi from './fabi.JPG';

const testimonials = [
  {
    avatar: fabi,
    name: 'Hannah Schmitt',
    position: 'Lead designer',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus malesuada. Suspendisse sed magna eget nibh in turpis.'
  },
  {
    avatar: fabi,
    name: 'Hannah Schmitt',
    position: 'Lead designer',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus malesuada. Suspendisse sed magna eget nibh in turpis.'
  },
  {
    avatar: fabi,
    name: 'Hannah Schmitt',
    position: 'Lead designer',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus malesuada. Suspendisse sed magna eget nibh in turpis.'
  }
];

const TestimonialSection = () => {
  return (
    <section className="testimonials">
      <h2>Ce que nos clients disent de nous</h2>
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-content">
              <img src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} className="testimonial-avatar" />
              <h3>{testimonial.name}</h3>
              <p className="position">{testimonial.position}</p>
              <p className="quote">“{testimonial.quote}”</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dots">
        {testimonials.map((_, index) => (
          <span key={index} className={`dot ${index === 0 ? 'active' : ''}`}></span>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
