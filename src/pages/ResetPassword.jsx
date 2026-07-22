import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [checkingToken, setCheckingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Verify the token validity on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/reset-password/${token}`);
        if (response.data.success) {
          setIsTokenValid(true);
        }
      } catch (err) {
        setIsTokenValid(false);
        setError(
          err.response?.data?.message || 'This password reset link is invalid or has expired.'
        );
      } finally {
        setCheckingToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, {
        password,
      });

      setSuccess('Your password has been reset successfully! Redirecting to Login...');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to reset password. The link may have expired.'
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
            <i className="bi bi-key-fill"></i>
          </div>

          <h2 className="text-center mb-2 font-weight-bold">Reset Password</h2>
          <p className="text-center text-muted mb-4">Set a secure new password for your account</p>

          {checkingToken ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Verifying secure reset token...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="alert alert-glass d-flex align-items-start mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5 mt-1"></i>
                  <div>
                    <h6 className="alert-heading font-weight-bold mb-1">Reset Error</h6>
                    <p className="mb-0">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="alert alert-glass-success d-flex align-items-start mb-4" role="alert">
                  <i className="bi bi-check-circle-fill me-2 fs-5 mt-1"></i>
                  <div>
                    <h6 className="alert-heading font-weight-bold mb-1">Success!</h6>
                    <p className="mb-0">{success}</p>
                  </div>
                </div>
              )}

              {isTokenValid ? (
                <form onSubmit={handleResetPassword}>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">New Password</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingConfirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        Save Password
                        <i className="bi bi-shield-check ms-2 fs-5"></i>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center mt-3">
                  <p className="text-muted mb-4">
                    This link has already been used, is malformed, or the 15-minute validity window has expired.
                  </p>
                  <Link to="/forgot-password" className="btn btn-gradient w-100 py-3">
                    Request New Reset Link
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
