import React from 'react';
import './css/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import Footer from './Footer';
import Navigation from './Navigation';

function Home() {
    let navigate = useNavigate();
    const navigateToCoachSignup = () => {
        navigate('/coachsignup')
    }
    const navigateToCoachLogin = () => {
        navigate('/coachlogin')
    }
    const navigateToUserSignup = () => {
        navigate('/usersignup')
    }
    const navigateToUserLogin = () => {
        navigate('/userlogin')
    }
    useEffect(() => {
            document.body.style.background = "url('back-cover.jpg') no-repeat center center fixed";
            document.body.style.backgroundSize = "cover";
    });
    return(
          <>
          <Navigation/>
          <br/>
          <h1> We are at the heart of appropriate care</h1><br/>
           <br/>
            <div class="place-row" >
            <div class="card" style={{ width: '30rem'}}>
            <div class="card text-center bg-dark text-white">
            <img  class="card-img-top" src="coach_avtar.png" alt="coach" /> <br/>
                        <div class="card-body">
                        <div className="d-grid gap-4">
                        <button type="button" class="btn btn-info btn-lg w-100" onClick={navigateToCoachLogin}>Login as Coach</button>
                        <button type="button" class="btn btn-info btn-lg w-100" onClick={navigateToCoachSignup}>Join as Coach</button>
                        </div>
                        </div>
            </div>
            </div>
            <div class="card" style={{ width: '30rem' }}>
            <div class="card text-center bg-dark text-white">
            <img  class="card-img-top" src="user_avtar.png" alt="user" height = "290"/> <br/>
                        <div class="card-body">
                        <div className="d-grid gap-4">
                        <button type="button" class="btn btn-info btn-lg w-100" onClick={navigateToUserLogin}>Login as User</button>
                        <button type="button" class="btn btn-info btn-lg w-100" onClick={navigateToUserSignup}>Join as User</button>
                        </div>
                        </div>
            </div>
            </div>
            </div>
            <Footer />
          </>
    );
}

export default Home;


