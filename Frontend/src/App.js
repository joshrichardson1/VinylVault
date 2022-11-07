// css
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useState} from 'react'

// pages
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage'
import AppNav from './components/AppNav/AppNav';
import MyCollectionPage from './pages/MyCollectionPage';
import SearchPage from './pages/SearchPage';
import VinylDetailPage from './pages/VinylDetailPage';
import AllEventsPage from './pages/AllEventsPage';


const App = () => {
  
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <AppNav user={user} setUser={setUser}/> 
          <Routes>
          <Route path="/" element={<WelcomePage setUser={setUser}/>} />
            <Route path="/create-account/" element={<CreateAccountPage />} />
            <Route path="/login/" element={<LoginPage setUser={setUser}/>} />
            <Route path="/home/my-collection/" element={<MyCollectionPage user={user} />} />
            <Route path="/home/my-collection/:artist/:album/:vinylID/" element={<VinylDetailPage />} />
            <Route path="/home/all-events/" element={<AllEventsPage />} />
            <Route path="/home/search/:artist/:album/" element={<SearchPage user={user} />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
  