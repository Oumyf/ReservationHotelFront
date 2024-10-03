import React from 'react';
import TestimonialCard from './TestimonialCard';
import './TestimonialCarousel.css';
import fabi from './fabi.JPG';



const TestimonialCarousel = () => {
  const testimonials = [
    {
      image: fabi,
      name: 'Hannah Schmitt',
      position: 'Lead Designer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: fabi,
      name: 'Hannah Schmitt',
      position: 'Lead Designer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      image: fabi,
      name: 'Hannah Schmitt',
      position: 'Lead Designer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
  ];

  return (
    <div className="testimonial-carousel">
      <h2>Ce que nos clients disent de nous</h2>
      <div className="carousel-container">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            image={testimonial.image}
            name={testimonial.name}
            position={testimonial.position}
            text={testimonial.text}
            highlight={index === 1} 
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
