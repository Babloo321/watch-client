import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Protected.Route';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import Home from './components/home/Home';
import You from './components/you/You';
import VideoUpload from './components/videoUpload/VideoUpload';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Search from './components/search/Search';
import VideoPlayer from './pages/video_Player/VideoPlayer';
import Subscriptions from './components/subscription/Subscriptions';
import SubscriptionsDetails from './components/subscription/SubscriptionsDetails';
function App() {
  return (
    <Router>
      <div className="flex flex-col-reverse bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate-signup" element={<Signup />} />
        <Route path="/authenticate-login" element={<Login />} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/you" element={<ProtectedRoute><You /></ProtectedRoute>} />
        <Route path="/video-player" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
        <Route path="/subscriptions-details" element={<ProtectedRoute><SubscriptionsDetails /></ProtectedRoute>} />
        <Route path="/video-upload" element={<ProtectedRoute><VideoUpload /></ProtectedRoute>} />
        </Routes>
        <Navbar />
      </div>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="colored"
      />
    </Router>
  );
}

export default App;
