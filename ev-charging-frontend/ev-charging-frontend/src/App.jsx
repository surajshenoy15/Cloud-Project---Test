import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stations from './pages/Stations';
import Bookings from './pages/Bookings';
import StationList from "./pages/StationList";
import StationDetails from "./pages/StationDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingConfirmation from "./pages/BookingConfirmation";
import Invoice from './pages/Invoice';
import Payment from './pages/Payment';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/stations/:id" element={<StationDetails />} />
            <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/payment/:id" element={<Payment />} /> {/* New payment route */}
            <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
