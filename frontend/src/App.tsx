import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CharacterSheet from './pages/CharacterSheet';
import CharacterForm from './pages/CharacterForm';
import CharacterView from './pages/CharacterView';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/character-sheet" 
          element={
            <ProtectedRoute>
              <CharacterSheet />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/character-sheet/new" 
          element={
            <ProtectedRoute>
              <CharacterForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/character-sheet/:id" 
          element={
            <ProtectedRoute>
              <CharacterView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/character-sheet/:id/edit" 
          element={
            <ProtectedRoute>
              <CharacterForm />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
