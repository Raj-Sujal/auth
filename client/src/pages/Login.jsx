import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const map = {};
        err.response.data.errors.forEach((e) => (map[e.field] = e.message));
        setErrors(map);
      } else {
        setErrorMsg(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-sm w-full p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>

        {errorMsg && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded text-sm mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-slate-400 text-xs text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
