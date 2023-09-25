import Footer from "./Footer";
import { useState } from "react";
import axios from 'axios';

import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FiLogOut, FiPhone } from "react-icons/fi";
import { AiTwotoneSchedule, AiOutlineUser } from "react-icons/ai";


function CoachHome(){
       let navigate = useNavigate();
       //let params = useParams();
       const [slotDate, setSlotDate] = useState("");
       const [slotTime, setSlotTime] = useState("");
       const [bookingId, setBookingId] = useState(0);
       const [userId, setUserId] = useState(0);
       const [flag , setFlag] = useState(false);
       //const coachId = params.id;
       const [noSchedule, setNoSchedule] = useState(false);
       const [coachDetails, setCoachDetails] = useState({name:"", password: "", gender: "", dateOfBirth: "", mobileNumber: "", speciality: ""})
       let location = useLocation();
       const coachId = location.state.CoachId;

       const getSchedules = (event) => {
          event.preventDefault();
          console.log("coachId "+coachId);
          axios.get("http://localhost:8080/bookings?coachId="+coachId).then((res) => {
               // console.log(res.data);
                if(res.data.length > 0){
                  setSlotDate(res.data[0].appointmentDate);
                 // console.log(res.data[0].appointmentDate);
                  setSlotTime(res.data[0].slot);
                  setBookingId(res.data[0].id);
                  setUserId(res.data[0].userId);
                  setNoSchedule(false);
                } else 
                  setNoSchedule(true);
            })
          setFlag(false);
          // navigate('/coachschedules/'+coachId);
          navigate('/coachschedules',{state:{CoachId:coachId}});
       }
       const onLogout = (event) => {
            event.preventDefault()
            navigate('/coachlogin');
        }

        const viewProfile = (event) => {
          event.preventDefault()
          setFlag(true);
          axios.get("http://localhost:8080/coaches?id="+coachId).then((res) => {
              setCoachDetails(res.data[0]);
          });
         // navigate('/coachviewprofile/'+coachId);
         navigate('/coachviewprofile', {state:{CoachId:coachId}});
        }
        return(
          <>
                    <Navbar bg="dark" style={{ "height": "55px" }}>
                        <Navbar.Brand href="/" style={{ "marginTop": '10px' }}>
                              <img height="55px" alt="wecare" src={'wecare-logo.png'} />
                                    </Navbar.Brand>
                                    <Navbar.Toggle />
                                    <Navbar.Collapse className="justify-content-end" style={{ "marginRight": '10px', "marginTop": '15px' }}>
                                    <Nav>
                                      <NavItem>
                                          <div className='row'>
                                              <p className="text-muted credit"><AiOutlineUser size={20} onClick={viewProfile} />View Profile &nbsp;&nbsp;<AiTwotoneSchedule size={20} onClick={getSchedules} />My Schedules &nbsp;&nbsp;<FiPhone size={20} />Call Us: 080 2233447
                                              &nbsp;&nbsp;<FiLogOut size={20} onClick={onLogout} />Logout</p>
                                          </div>
                                      </NavItem>
                                      </Nav>
                                    </Navbar.Collapse>
                             </Navbar>
                            {
                             flag ? 
                             <div class="row align-items-center vh-100">
                                        <div class="col-5 mx-auto">
                                                  <div class="card shadow border bg-dark text-white">
                                                            <div class="card-body ">
                                                                                <center>
                                                                                <img className = "resize" alt="coach" src="coach_avtar.png" />
                                                                                <h4 >Coach Id: {coachId}</h4>
                                                                                <p >Date of Birth:{coachDetails.dateOfBirth} <br /> Mobile No: {coachDetails.mobileNumber} <br /> 
                                                                                Speciality: {coachDetails.speciality} </p>
                                                                                </center>
                                                            </div>
                                                  </div>
                                        </div>
                              </div> 
                      :  
                      noSchedule ? 
                      <div class="row align-items-center vh-100"><center><h1>No planned schedule yet</h1></center></div> 
                      :
                              <div class="row align-items-center vh-100">
                              <div class="col-6 mx-auto">
                              <div class="card shadow border bg-dark text-white">
                              <div class="card-body d-flex flex-column align-items-center content">
                              <h3>Appointment Date:</h3><h3>{slotDate}</h3><br/>
                              <h4>Slot:&nbsp;{slotTime}</h4>
                              <div class="card-body">
                              <center><p>Booking id: {bookingId} <br/> User Id: {userId}</p></center>
                              </div>
                              </div>
                              </div>
                              </div>
                              </div>
                            }
                    <Footer /></>       
        )
}

export default CoachHome;