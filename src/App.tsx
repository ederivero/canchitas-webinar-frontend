import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Canchita } from './components/Canchita';
import { useState } from 'react';
import { IPlaces, ISelectedPlace } from './interfaces/interfaces';
import { Booking } from './components/Booking';
import { isAuthenticated } from './services/auth';
import { Register } from './components/Register';
import { AuthState } from './context/AuthState';

function App() {

  const [place, setPlace] = useState<IPlaces>({
    id: "",
    attachment: {
      signedUrl: "",
    },
    direction: "",
    name: "",
    schedules: []
  });

  const [selectedPlace, setSelectedPlace] = useState<ISelectedPlace>({
    place: {
      id: "",
      attachment: {
        signedUrl: ""
      },
      direction: "",
      name: "",
    },
    hourStart: "",
    day: 0,
  })

  const isLogged = isAuthenticated();

  return (
    <AuthState>
      <Router>
        <Routes>
          <Route path="/" element={<Home setPlace={setPlace} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path={`/canchita/${place.id}`} element={<Canchita isLogged={isLogged} place={place} setSelectedPlace={setSelectedPlace} />} />
          <Route path={`/booking/${place.id}`} element={<Booking isLogged={isLogged} selectedPlace={selectedPlace} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthState>
  )
}

export default App;
