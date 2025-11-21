// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Home from './pages/Home';
import StoreList from './pages/StoreList';
import ProposalDetail from './pages/ProposalDetail';
import Favorites from './pages/Favorites';

// 로그인 체크 컴포넌트
function PrivateRoute({ children }) {
  const userId = localStorage.getItem('userId');
  return userId ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 스플래시 화면 */}
        <Route path="/" element={<Splash />} />
        
        {/* 로그인 화면 */}
        <Route path="/login" element={<Login />} />
        
        {/* 보호된 라우트들 */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/stores" element={<PrivateRoute><StoreList /></PrivateRoute>} />
        <Route path="/proposal/:id" element={<PrivateRoute><ProposalDetail /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;