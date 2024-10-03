import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ComfortSection from './components/page_accueil/section_confort/ComfortSection';
import PartnerHotelSection from './components/page_accueil/section_partenaires/PartnerHotelSection';
import PopularRooms from './components/page_accueil/section_chambres/PopularRooms';
import TestimonialCarousel from './components/page_accueil/section_temoignages/TestimonialCarousel';
import PricingSection from './components/page_accueil/section_prix/PricingSection';
import Footer from '../src/components/Footer';
import HotelList from './components/HotelList';




const App = () => {
  return (
    <div>
         <Header />
         <ComfortSection />
         <PartnerHotelSection />
         <PopularRooms />
         <TestimonialCarousel />
         <PricingSection />
         <Footer />
         <HotelList />
    </div>
  );
};

export default App;
