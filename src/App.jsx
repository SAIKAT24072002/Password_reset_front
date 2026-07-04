import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function Header() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3 px-4">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-white mx-auto" to="/">
          <i className="bi bi-shield-fill-check text-primary me-2 fs-3"></i>
          SECURE<span className="text-primary">PASS</span>
        </Link>
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
            <Route path="/" element={<ForgotPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Fallback route */}
            <Route path="*" element={
              <div className="text-center py-5">
                <h4 className="text-danger mb-3">Page Not Found</h4>
                <Link to="/" className="link-custom">Return to Safety</Link>
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
