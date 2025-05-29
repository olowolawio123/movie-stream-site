import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Terms from "./pages/Terms";
import SearchResults from "./pages/SearchResults"; // or from "./components/SearchResults"
import MovieDetails from "./pages/MovieDetails";
import MyListSection from "./components/MyListSection";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";




function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watch/:movieId" element={<Watch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/MyListSection" element={<MyListSection />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
