import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import MeetingRoomsPage from "./pages/MeetingRoomsPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RoomDetails from "./pages/RoomDetails";
import NotFoundPage from "./pages/NotFoundPage";
import AdminRoute from "./components/AdminRoute";
import AdminDashboardMain from "./pages/AdminDashboardMain";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BookingPage from "./pages/BookingPage";
import RoomManagement from "./pages/RoomManagement";
import SlotsManagement from "./pages/SlotsManagement";
import BookingManagement from "./components/BookingManagement";
import WelcomeDashboard from "./components/WelcomeDashboard";
import './App.css';
function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/meeting-rooms" element={<MeetingRoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/book-room/:id" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardMain />
              </AdminRoute>
            }
          >
            <Route
              path="room-management"
              element={
                <AdminRoute>
                  <RoomManagement />
                </AdminRoute>
              }
            />
            <Route
              path=""
              element={
                <AdminRoute>
                  <WelcomeDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="slot-management"
              element={
                <AdminRoute>
                  <SlotsManagement />
                </AdminRoute>
              }
            />
            <Route
              path="booking-management"
              element={
                <AdminRoute>
                  <BookingManagement />
                </AdminRoute>
              }
            />
          </Route>

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
      <ScrollToTopButton />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
