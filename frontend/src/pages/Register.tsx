import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

interface ValidationError {
  field: string;
  message: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (formData.password !== formData.confirmPassword) {
      setErrors([{ field: 'confirmPassword', message: 'Passwords do not match' }]);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting to register with data:', { ...formData, password: '[REDACTED]' });
      const response = await authService.register({
        email: formData.email,
        password: formData.password
      });
      console.log('Registration successful:', response);
      setSuccess(true);
      // Wait for 2 seconds to show the success message before redirecting
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors([{
          field: 'general',
          message: err.response?.data?.message || err.message || 'Registration failed. Please try again.'
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return errors.find(err => err.field === fieldName)?.message;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
      {errors.length > 0 && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '0.5rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {errors.map((error, index) => (
            <div key={index} style={{ marginBottom: index < errors.length - 1 ? '0.5rem' : 0 }}>
              {error.message}
            </div>
          ))}
        </div>
      )}
      {success && (
        <div style={{ 
          color: '#2e7d32', 
          backgroundColor: '#e8f5e9', 
          padding: '0.5rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          Registration successful! Redirecting to login...
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading || success}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: getFieldError('email') ? '1px solid red' : '1px solid #ccc',
              opacity: isLoading || success ? 0.7 : 1
            }}
          />
          {getFieldError('email') && (
            <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {getFieldError('email')}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading || success}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: getFieldError('password') ? '1px solid red' : '1px solid #ccc',
              opacity: isLoading || success ? 0.7 : 1
            }}
          />
          {getFieldError('password') && (
            <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {getFieldError('password')}
            </div>
          )}
          <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            Password must:
            <ul style={{ margin: '0.25rem 0 0 1.5rem', padding: 0 }}>
              <li>Be at least 6 characters long</li>
              <li>Contain at least one letter</li>
              <li>Contain at least one number</li>
            </ul>
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading || success}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: getFieldError('confirmPassword') ? '1px solid red' : '1px solid #ccc',
              opacity: isLoading || success ? 0.7 : 1
            }}
          />
          {getFieldError('confirmPassword') && (
            <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {getFieldError('confirmPassword')}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || success}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading || success ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            opacity: isLoading || success ? 0.7 : 1
          }}
        >
          {isLoading ? 'Registering...' : success ? 'Registration Successful!' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register; 