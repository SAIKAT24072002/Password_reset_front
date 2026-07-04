import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email,
      });

      setSuccess(response.data.message || 'Reset link sent to your email address.');
      setEmail('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1 py-5">
      <div className="col-12 col-md-8 col-lg-5 animate-fade-in">
        <div className="glass-card">
          <div className="icon-badge">
            <i className="bi bi-envelope-open-fill"></i>
          </div>

          <h2 className="text-center mb-2 font-weight-bold">Forgot Password</h2>
          <p className="text-center text-muted mb-4">
            Enter your email address and we'll send you a secure link to reset your password.
          </p>

          {error && (
            <div className="alert alert-glass d-flex align-items-center mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="alert alert-glass-success d-flex align-items-center mb-4" role="alert">
              <i className="bi bi-send-check-fill me-2 fs-5"></i>
              <div>{success}</div>
            </div>
          )}

          <form onSubmit={handleForgotPassword}>
            <div className="form-floating mb-4">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <i className="bi bi-send-fill ms-2 fs-6"></i>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
