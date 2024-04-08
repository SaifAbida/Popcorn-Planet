import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import UpdateDelete from "./pages/UpdateDelete";
import Users from "./pages/User";
import UpdateUsers from "./pages/UpdateUsers";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/settings" element={<UpdateDelete />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UpdateUsers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
