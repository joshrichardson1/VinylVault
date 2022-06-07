import {React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import LoginPage from './LoginPage'

const WelcomePage = () => {

  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate();

  return (
    <div id="loginMain">
      <div id="loginMenu">
        <h2>Welcome to VinylVault!</h2>
        <p>Please login or create an account to start spinning!</p>
        <hr />
        <Button
          variant="primary"
          className="m-2"
          type="submit"
          onClick={() => setShowLogin(true)}
        >
          Login
        </Button>
        <Button
          variant="primary"
          className="m-2"
          type="submit"
          onClick={() => navigate("/create-account/")}
        >
          Create An Account
        </Button>
      </div>
      <div className="" id="loginForm">
        {showLogin && <LoginPage />}
      </div>
    </div>
  );
}

export default WelcomePage;


