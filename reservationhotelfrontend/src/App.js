import React, { lazy, Suspense, useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import LoaderComponent from "./components/LoaderComponent";
import HotelRooms from "./components/HotelRooms";
import AddChambre from './components/Rooms/AddChambre';
import RoomList from './components/Rooms/RoomList';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// Lazy loading components
const ComfortSection = lazy(() => import("./components/page_accueil/section_confort/ComfortSection"));
const PartnerHotelSection = lazy(() => import("./components/page_accueil/section_partenaires/PartnerHotelSection"));
const PopularRooms = lazy(() => import("./components/page_accueil/section_chambres/PopularRooms"));
const TestimonialCarousel = lazy(() => import("./components/page_accueil/section_temoignages/TestimonialCarousel"));
const PricingSection = lazy(() => import("./components/page_accueil/section_prix/PricingSection"));
// const HotelList = lazy(() => import("./components/HotelList"));
const HotelDetails = lazy(() => import("./components/HotelDetails"));
const SignupForm = lazy(() => import("./components/SignUpForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const ChambreList = lazy(() => import("./components/ChambreList"));
const Dashboard = lazy(() => import("./components/Dashboard"));

const Home = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<LoaderComponent />}>
        <ErrorBoundary>
          <ComfortSection />
          <PartnerHotelSection />
          <PopularRooms />
          <TestimonialCarousel />
          <PricingSection />
        </ErrorBoundary>
      </Suspense>
      <Footer />
    </div>
  );
};

const App = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/chambres');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des chambres:', error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:hotelId" element={<Suspense fallback={<LoaderComponent />}><ErrorBoundary><HotelDetails /></ErrorBoundary></Suspense>} />
        <Route path="/inscription" element={<Suspense fallback={<LoaderComponent />}><ErrorBoundary><SignupForm /></ErrorBoundary></Suspense>} />
        <Route path="/connexion" element={<Suspense fallback={<LoaderComponent />}><ErrorBoundary><LoginForm /></ErrorBoundary></Suspense>} />
        <Route path="/liste_chambres/:hotelId" element={<HotelRooms />} />
        <Route path="/chambres/:hotelId" element={<Suspense fallback={<LoaderComponent />}><ErrorBoundary><ChambreList /></ErrorBoundary></Suspense>} /> {/* Ajoutez cette ligne */}
        <Route path="/dashboard" element={<Suspense fallback={<LoaderComponent />}><ErrorBoundary><Dashboard /></ErrorBoundary></Suspense>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ajouter_chambre" element={<AddChambre fetchRooms={fetchRooms} />} /> {/* Pass fetchRooms here */}
        <Route path="/rooms" element={<RoomList />} />
      </Routes>
    </Router>
  );
};

export default App;
