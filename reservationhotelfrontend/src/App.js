// App.js
import React, { lazy, Suspense, useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import LoaderComponent from "./components/LoaderComponent";
import HotelRooms from "./components/HotelRooms";
import AddChambre from "./components/Rooms/AddChambre";
import RoomList from "./components/Rooms/RoomList";
import Reservation from "./Reservation";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./Payment";
import ReservationList from "./components/ReservationList";
import ConfirmationPage from "./components/ConfirmationReservation";
// import RegistrationPage from "./components/RegistrationPage";
import ReservationsByUser from "./components/ReservationsByUser";

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
const ComfortSection = lazy(() =>
  import("./components/page_accueil/section_confort/ComfortSection")
);
const PartnerHotelSection = lazy(() =>
  import("./components/page_accueil/section_partenaires/PartnerHotelSection")
);
const PopularRooms = lazy(() =>
  import("./components/page_accueil/section_chambres/PopularRooms")
);
const TestimonialCarousel = lazy(() =>
  import("./components/page_accueil/section_temoignages/TestimonialCarousel")
);
const PricingSection = lazy(() =>
  import("./components/page_accueil/section_prix/PricingSection")
);
const HotelDetails = lazy(() => import("./components/HotelDetails"));
const RegistrationPage = lazy(() => import("./components/RegistrationPage"));
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
      const response = await fetch("http://localhost:8000/api/chambres");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des chambres:", error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/hotels/:hotelId"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <ErrorBoundary>
                <HotelDetails />
              </ErrorBoundary>
            </Suspense>
          }
        />
        <Route
          path="/inscription"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <ErrorBoundary>
                <RegistrationPage />
              </ErrorBoundary>
            </Suspense>
          }
        />
        <Route
          path="/connexion"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <ErrorBoundary>
                <LoginForm />
              </ErrorBoundary>
            </Suspense>
          }
        />
        <Route path="/liste_chambres/:hotelId" element={<HotelRooms />} />
        <Route
          path="/chambres/:hotelId"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <ErrorBoundary>
                <ChambreList />
              </ErrorBoundary>
            </Suspense>
          }
        />
        <Route path="/confirmationReservation" element={<ConfirmationPage />} />

        {/* Routes protégées pour les utilisateurs hôtels */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["hotel"]}>
              <Suspense fallback={<LoaderComponent />}>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/ajouter_chambre"
          element={
            <PrivateRoute allowedRoles={["hotel"]}>
              <AddChambre fetchRooms={fetchRooms} />
            </PrivateRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <PrivateRoute allowedRoles={["hotel"]}>
              <RoomList />
            </PrivateRoute>
          }
        />

        {/* Route protégée pour les réservations */}
        <Route
          path="/reservation"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <Reservation />
            </PrivateRoute>
          }
        />

        {/* Route de paiement */}
        <Route
          path="/payment/:reservationId"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <Payment />
            </PrivateRoute>
          }
        />

        <Route
          path="/mes-reservations"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ReservationsByUser />
            </PrivateRoute>
          }
        />

        <Route path="/reservations" element={<ReservationList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
