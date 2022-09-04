import React, { useState } from 'react';
import './css/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

function CoachLogin() {
    let navigate = useNavigate();
    const [coachId, setCoachId] = useState('');
    const [password, setPassword] = useState('');
    const [msgId, setMsgId] = useState('');
    const [msgPassword, setMsgPassword] = useState('');
    const [msgValid, setMsgValid] = useState('');

    const validateCoach= (e) => {
        e.preventDefault();
        setMsgId(""); setMsgPassword(""); setMsgValid("");
        if(coachId === "")
            setMsgId("Required");
        else if(password.length < 5 || password.length > 10)
            setMsgPassword('Password should have 5 to 10 characters');
        else {
            setMsgId(""); setMsgPassword(""); setMsgValid("");
            axios.get("http://localhost:8080/coaches?id="+coachId+"&password="+password).then((res) => {
                // console.log(res.data[0].id);
                
                if(res.data.length > 0)
                {
                    let newId = res.data[0].id;;
                    //navigate('/coachhome/'+newId);
                    navigate('/coachhome',{state:{CoachId:newId}});
                }
                else 
                    setMsgValid("Invalid credentials")
            })
        }
    }

    return(
          <React.Fragment>
            <Navigation/>
          <div class="row align-items-center vh-100">
          <div class="col-6 mx-auto">
                    <div class="card shadow border bg-dark text-white">
                    <div class="card-body d-flex flex-column align-items-center content">
                    <img  class="resize" src="coach_avtar.png" alt="coach"/><h2 class = "title">Login as a Life Coach</h2>
                    <br/>
                    <div class="card-body">
                    <Form>
                              <Form.Group className="mb-2" controlId="formBasicName">
                              <Form.Control type="text" placeholder = "Coach Id" size ="lg" onChange={(e) => {setCoachId(e.target.value)}}/>
                              <p className="text-danger">{msgId}</p>
                              </Form.Group>
                               &nbsp;
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Control type="password" placeholder = "Password"  size ="lg" onChange={(e) => {setPassword(e.target.value)}}/>
                              <p className="text-danger">{msgPassword}</p>
                              </Form.Group>
                              <br/>
                              <div className="d-grid gap-2">
                              <Button variant="primary" type="submit" onClick={validateCoach}>
                              Login
                              </Button><br/>
                              <p className="text-danger">{msgValid}</p>
                    </div>
                    </Form>
                    </div>
                    </div>
                    </div>
          </div>
          </div>
          </React.Fragment>
    );
}

export default CoachLogin;