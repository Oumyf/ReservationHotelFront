import React from 'react';
import Slider from 'react-slick';
import './TestimonialSection.css'; // Importation du fichier CSS personnalisé
import fabi from './fabi.JPG';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Hannah Schmitt',
      role: 'Lead Designer',
      image: fabi, // Chemin à remplacer par l'image réelle
      testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.',
    },
    {
      name: 'Hannah Schmitt',
      role: 'Lead Designer',
      image: fabi, // Chemin à remplacer par l'image réelle
      testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.',
    },
    {
      name: 'Hannah Schmitt',
      role: 'Lead Designer',
      image: fabi, // Chemin à remplacer par l'image réelle
      testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.',
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="testimonial-section">
      <h2 className="title">Ce que nos clients disent de nous</h2>
      <div className="carousel-container">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="avatar-container">
                  <img src={testimonial.image} alt={testimonial.name} className="avatar" />
                </div>
                <h3 className="name">{testimonial.name}</h3>
                <p className="role">{testimonial.role}</p>
                <p className="testimony">"{testimonial.testimony}"</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSection;
