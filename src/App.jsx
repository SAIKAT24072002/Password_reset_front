import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function Header() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3 px-4">
      <div className="container-fluid max-width-1200">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-white" to="/">
          <i className="bi bi-shield-fill-check text-primary me-2 fs-3"></i>
          SECURE<span className="text-primary">PASS</span>
        </Link>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <Link
            to="/login"
            className={`btn btn-sm ${location.pathname === '/login' || location.pathname === '/' ? 'btn-primary' : 'btn-outline-light'} px-3`}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className={`btn btn-sm ${location.pathname === '/register' ? 'btn-primary' : 'btn-outline-light'} px-3`}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-height-100vh">
        <Header />
        <main className="flex-grow-1 d-flex flex-column justify-content-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Fallback route */}
            <Route path="*" element={
              <div className="text-center py-5">
                <h4 className="text-danger mb-3">Page Not Found</h4>
                <Link to="/" className="link-custom">Return to Home</Link>
              </div>
            } />
          </Routes>
        </main>
        <footer className="py-4 text-center border-top border-secondary border-opacity-10 mt-auto text-muted">
          <div className="container">
            <small>&copy; 2026 SecurePass Auth System. Built with React, Bootstrap, and Node.js.</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
