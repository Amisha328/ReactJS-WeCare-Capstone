import React, { useState } from 'react';
import './css/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';


function UserSignUp() {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [msgName, setMsgName] = useState('');
    const [msgPassword, setMsgPassword] = useState('');
    const [msgDOB, setMsgDOB] = useState('');
    const [msgMobile, setMsgMobile] = useState('');
    const [msgEmail, setMsgEmail] = useState('');
    const [msgGender, setMsgGender] = useState('');
    const [msgPincode, setMsgPincode] = useState('');
    const [msgCity, setMsgCity] = useState('');
    const [msgState, setMsgState] = useState('');
    const [msgCountry, setMsgCountry] = useState('');
    const [isValid, setValid] = useState(false);
    const [newID, setNewID] = useState(0);
    

    const navigateToUserLogin = () => {
        navigate('/userlogin')
    }

    const addUser = (e) => {
        e.preventDefault();
        setMsgName(""); setMsgPassword(""); setMsgMobile(""); setMsgGender(""); setMsgDOB(""); setMsgEmail(""); 
        setMsgPincode(""); setMsgCity(""); setMsgState(""); setMsgCountry("");
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
        else if(gender.length === 0)
            setMsgGender("Required");
        else if(email.length === "")
            setMsgEmail("Required");
        else if(pincode.length !== 6)
            setMsgPincode("Pincode should have 6 digits");
        else if(city.length < 6 || city.length > 20)
            setMsgCity("City should have 6 to 20 characters");
        else if(state.length < 6 || state.length > 20)
            setMsgState("State should be 6 to 20 characters");
        else if(country.length < 5 || country.length > 20)
            setMsgCountry("Country should have 5 to 20 characters");   
        else{
            setMsgName(""); setMsgPassword(""); setMsgMobile(""); setMsgGender(""); setMsgDOB(""); setMsgEmail(""); 
            setMsgPincode(""); setMsgCity(""); setMsgState(""); setMsgCountry("");
            let newUsers = {name:name, password: password, gender: gender, dateOfBirth: dob, mobileNumber: mobileNumber, email: email, pincode: pincode, city: city, state: state, country: country };
            axios.post("http://localhost:8080/users/",newUsers).then((res) => {
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
          <br/><br/>
          <div class="row align-items-center vh-100">
            {
                isValid?
                <center>
                    <img  class="resize" src="user_avtar.png" alt="user"/>
                    <h2 class = "title">You are a Coach now !</h2><br/>
                    <h3>Your Coach Id is {newID}</h3><br/>
                    <Button variant="primary" type="submit" onClick={navigateToUserLogin}> Login </Button>
                </center>
        :
      <div class="col-6 mx-auto">
                <div class="card shadow border bg-dark text-white">
                <div class="card-body d-flex flex-column align-items-center content">
                <img  class="resize" src="user_avtar.png" alt="coach"/><h2 class = "title">User Profile</h2>
                <br/>
                <div class="card-body">
                <Form>
                <div className='signup-row'>
                          <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" onChange={(e) => {setName(e.target.value)}}/>
                          <p className="text-danger">{msgName}</p>
                          </Form.Group>
                          &nbsp;&nbsp;
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                          <p className="text-danger">{msgPassword}</p>
                          </Form.Group>
                </div>
                
                <div className='signup-row'>
                          <Form.Group className="mb-3" controlId="formBasicNumber">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control type="text" onChange = {(e) => {setMobileNumber(e.target.value)}}/>
                          <p className="text-danger">{msgMobile}</p>
                          </Form.Group>
                          &nbsp;&nbsp;
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" onChange = {(e) => {setEmail(e.target.value)}}/>
                          <p className='text-danger'>{msgEmail}</p>
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
                          <p className='text-danger'>{msgGender}</p>
                          </Form.Group>
                </div>
                
                <div className='signup-row'>
                          <Form.Group className="mb-3" controlId="formBasicPincode">
                          <Form.Label>Pincode</Form.Label>
                          <Form.Control type="text" onChange = {(e) => {setPincode(e.target.value)}}/>
                          <p className='text-danger'>{msgPincode}</p>
                          </Form.Group>
                          &nbsp;&nbsp;
                          <Form.Group className="mb-3" controlId="formBasicCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control type="text" onChange = {(e) => {setCity(e.target.value)}}/>
                          <p className='text-danger'>{msgCity}</p>
                          </Form.Group>
                </div>
                
                <div className='signup-row'>
                          <Form.Group className="mb-3" controlId="formBasicState">
                          <Form.Label>State</Form.Label>
                          <Form.Control type="text" onChange = {(e) => {setState(e.target.value)}}/>
                          <p className='text-danger'>{msgState}</p>
                          </Form.Group>
                          &nbsp;&nbsp;
                          <Form.Group className="mb-3" controlId="formBasicCountry">
                          <Form.Label>Country</Form.Label>
                          <Form.Control type="text" onChange = {(e) => {setCountry(e.target.value)}}/>
                          <p className="text-danger">{msgCountry}</p>
                          </Form.Group>
                </div>
                <div className="d-grid gap-2">
                <Button variant="success" type="submit" onClick={addUser}>
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

export default UserSignUp;