import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
            Authentication & Product CRUD APIs Assignment
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
