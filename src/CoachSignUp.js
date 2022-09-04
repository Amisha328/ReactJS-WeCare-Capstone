import React, { useState } from 'react';
import './css/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';


function CoachSignUp() {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState(0);
    const [speciality, setSpeciality] = useState('');
    const [msgName, setMsgName] = useState('');
    const [msgPassword, setMsgPassword] = useState('');
    const [msgDOB, setMsgDOB] = useState('');
    const [msgMobile, setMsgMobile] = useState('');
    const [msgSpeciality, setMsgSpeciality] = useState('');
    const [isValid, setValid] = useState(false);
    const [newID, setNewID] = useState(0);

    const navigateToCoachLogin = () => {
        navigate('/coachlogin')
    }
    const addCoach = (e) => {
        e.preventDefault();
        setMsgName(""); setMsgPassword(""); setMsgMobile(""); setMsgSpeciality(""); setMsgDOB("");
        const birthDate =new Date(dob);
        const diff_ms = Date.now()-birthDate.getTime();
        const age_dt = new Date(diff_ms);
        const age = Math.abs(age_dt.getUTCFullYear() - 1970);

        if(name.length < 3  || name.length > 50)
            setMsgName('Name should have 3 to 50 characters');
        else if(password.length < 5 || password.length > 10)
            setMsgPassword('Password should have 5 to 10 characters');
        else if(age < 20 || age > 100)
            setMsgDOB('Age should be between 20 and 100 years');
        else if(mobileNumber.length !== 10)
            setMsgMobile('Mobile number should have 10 digits');
        else if(speciality.length < 10 || speciality.length > 50){
            setMsgSpeciality('Speciality should have 10 to 50 characters');
        }
        else{
            setMsgName(""); setMsgPassword(""); setMsgMobile(""); setMsgSpeciality(""); setMsgDOB("");
            let newCoach = {name:name, password: password, gender: gender, dateOfBirth: dob, mobileNumber: mobileNumber, speciality: speciality };
            axios.post("http://localhost:8080/coaches/",newCoach).then((res) => {
                console.log(res.data);
                setValid(true);
                setNewID(res.data.id);
                // console.log(newID);
            })
        }
    }
    return(
          <React.Fragment>
          <Navigation/>
          <div class="row align-items-center vh-100">
          {
                isValid?
                    <center>
                        <img  class="resize" src="coach_avtar.png" alt="coach"/>
                        <h2 class = "title">You are a Coach now !</h2><br/>
                        <h3>Your Coach Id is {newID}</h3><br/>
                        <Button variant="primary" type="submit" onClick={navigateToCoachLogin}> Login </Button>
                    </center>
                :
                    <div class="col-6 mx-auto">
                    <div class="card shadow border bg-dark text-white">
                    <div class="card-body d-flex flex-column align-items-center content">
                    <img  class="resize" src="coach_avtar.png" alt="coach"/><h2 class = "title">Life Coach Profile</h2>
                    <br/>
                    <div class="card-body">
                    <Form>
                    <div className='signup-row'>
                              <Form.Group className="mb-3" controlId="formBasicName">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" onChange={(e) => {setName(e.target.value)}}/>
                              {/* <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                              </Form.Text> */}
                              <p className="text-danger">{msgName}</p>
                              </Form.Group>
                              &nbsp;&nbsp;
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password"  onChange={(e) => {setPassword(e.target.value)}}/>
                              <p className="text-danger">{msgPassword}</p>
                              </Form.Group>
                    </div>
                    
                    <div className='signup-row'>
                              <Form.Group className="mb-3" controlId="formBasicDate">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control type="date" onChange={(e) => {setDob(e.target.value)}}/><br/>
                              <p className="text-danger">{msgDOB}</p>
                              </Form.Group>
                              &nbsp;&nbsp;
                              <Form.Group className="mb-3" controlId="formBasicGender">
                              <Form.Label>Gender</Form.Label><br/>&nbsp;&nbsp;
                              <Form.Check inline type='radio' label="Male" id = "M" name = "gender" value = "M" onChange={(e) => { setGender(e.target.value)}}/>
                              <Form.Check inline type='radio' label="Female" id = "F" name = "gender" value = "F" onChange={(e) => {setGender(e.target.value)}}/>
                              </Form.Group>
                    </div>
                    
                    <div className='signup-row'>
                              <Form.Group className="mb-3" controlId="formBasicNumber">
                              <Form.Label>Mobile Number</Form.Label>
                              <Form.Control type="text" onChange = {(e) => {setMobileNumber(e.target.value)}}/>
                              <p className="text-danger">{msgMobile}</p>
                              </Form.Group>
                              &nbsp;&nbsp;
                              <Form.Group className="mb-3" controlId="formBasicSpeciality">
                              <Form.Label>Speciality</Form.Label>
                              <Form.Control type="text" onChange = {(e) => {setSpeciality(e.target.value)}}/>
                              <p className="text-danger">{msgSpeciality}</p>
                              </Form.Group>
                    </div>
                    <div className="d-grid gap-2">
                    <Button variant="success" type="submit" onClick = {addCoach}>
                     Register
                    </Button>
                    </div>
                    </Form>
                    </div>
                    </div>
                    </div>
          </div>
          }
          
          </div>       
          </React.Fragment>
    );
}

export default CoachSignUp;
