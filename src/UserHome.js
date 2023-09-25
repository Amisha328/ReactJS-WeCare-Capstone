import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FiLogOut, FiPhone } from "react-icons/fi";
import { AiTwotoneSchedule, AiOutlineUser } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

function UserHome() {
          let navigate = useNavigate();
          // let params = useParams();
          // const userId = params.id;
          let location = useLocation();
          const userId = location.state.UserId;

          const [slotDetails, setSlotDetails] = useState([]);
          const [coaches, setCoaches] = useState([]);
          const [userDetails, setUserDetails] = useState({name:"", dateOfBirth: "", mobileNumber: "", email: "", city: "", state: "", country: "", pincode: ""})
          const [profileflag , setProfileFlag] = useState(false);
          const [scheduleflag , setScheduleFlag] = useState(false);
          const [coachId, setCoachId] = useState('');
          const [bookingId, setBookingId] = useState('');

          const [appointmentFlag, setAppointmentFlag] = useState(false);
          const [slotDate, setSlotDate] = useState('');
          const [slotTime, setSlotTime] = useState('');

          const [message, setMessage] = useState('');
          const [updateAppFlag, setUpdateAppFlag] = useState(false);
          const [successFlag, setSuccessFlag]  = useState(false);
          const [updateSuccessFlag, setUpdateSuccessFlag] = useState(false);
          const [deleteSuccessFlag, setDeleteSuccessFlag] = useState(false);
          const [modalBoxFlag, setModalBoxFlag] = useState(false);
         //  const [buttonDisabled, setButtonDisabled] = useState(false);
          

          useEffect(() => {
            axios.get('http://localhost:8080/coaches').then((res) => {
              console.log(res.data);
              setCoaches(res.data);
            });
          }, []);

          const onLogout = (event) => {
                    event.preventDefault()
                    navigate('/userlogin');
          }
          
          const mySchedules = (event) => {
            event.preventDefault();
            setScheduleFlag(true);
            axios.get("http://localhost:8080/bookings?userId="+userId).then((res) => {
                setSlotDetails(res.data);
                
           });
        
           // navigate('/userappointments/'+userId);
           navigate('/userappointments',{state:{UserId:userId}});

        }
          const viewProfile = (event) => {
                    event.preventDefault();
                    setProfileFlag(true);
                    axios.get("http://localhost:8080/users?id="+userId).then((res) => {
                        setUserDetails(res.data[0]);
                        
                    });
                    // navigate('/userviewprofile/'+userId);
                    navigate('/userviewprofile ', {state:{UserId:userId}});
          }
          const flagSet = (id) => {
                setCoachId(id);
                setProfileFlag(false);
                setScheduleFlag(false);
                setSuccessFlag(false);
                setDeleteSuccessFlag(false);
                setModalBoxFlag(false);
                setUpdateSuccessFlag(false);
                setAppointmentFlag(true);
               // buttonDisabled(true);
          }


          const flagUpdateSet = (id) => {
                setBookingId(id);
                setProfileFlag(false);
                setScheduleFlag(false);
                setSuccessFlag(false);
                setAppointmentFlag(false);
                setUpdateSuccessFlag(false);
                setModalBoxFlag(false);
                setUpdateAppFlag(true);
                navigate('/userappointment', {state:{UserId:userId}})
          }

          const flagDeleteSet = (id) => {
             setBookingId(id);
            // console.log(bookingId);
             setProfileFlag(false);
             setScheduleFlag(false);
             setSuccessFlag(false);
             setAppointmentFlag(false);
             setUpdateSuccessFlag(false);
             setUpdateAppFlag(false);
             setModalBoxFlag(true);
             console.log(modalBoxFlag);
          }

          const rescheduleAppointment = (event) => {
               event.preventDefault();
               const currDate = new Date();
               const nextDate = (currDate.getDate() + 7)%31;
               const selectedDate = new Date(slotDate);
               setUpdateSuccessFlag(false);
            //    navigate('/userappointment/'+userId)
                navigate('/userappointment', {state:{UserId:userId}})
               setMessage("");
               if(currDate < nextDate && selectedDate.getDate() > nextDate)
               setMessage('Appointment Date should be any upcoming 7 days')
           else if(slotTime.length === 0)
               setMessage('Required');
           else {
                setMessage("");
               const newData = {appointmentDate: slotDate, slot: slotTime};
               axios.patch("http://localhost:8080/bookings/"+bookingId, newData).then((res) => {
                    console.log(res.data);
                    setUpdateAppFlag(false);
                    setUpdateSuccessFlag(true);
               })
            }
          }
          const bookAnAppointment = (event) => {
                event.preventDefault();
               // setButtonDisabled(true);
                const currDate = new Date();
               // console.log(currDate);
                setSuccessFlag(false);
                setMessage("");
               // console.log("currDate "+currDate.getDate());
                const nextDate = (currDate.getDate() + 7)%31;
               // console.log("nextDate "+nextDate);
                const selectedDate = new Date(slotDate);
               // console.log("Selected Date "+selectedDate);
                if(currDate < nextDate && selectedDate.getDate() > nextDate)
                    setMessage('Required, date should be any upcoming 7 days')
                else if(slotTime.length === 0)
                    setMessage('Required');
                else {
                    setMessage("");
                    //setButtonDisabled(false);
                    let newAppointment = {appointmentDate: slotDate, slot: slotTime, userId: userId, coachId: coachId};
                    axios.post("http://localhost:8080/bookings/",newAppointment).then((res) => {
                            setAppointmentFlag(false);
                            setSuccessFlag(true);
                    })
                }
          }

          const cancelAppointment = (e) => {
            e.preventDefault()
            //setBookingId(id);
            console.log(bookingId);
            setModalBoxFlag(false);
            axios.delete("http://localhost:8080/bookings/"+bookingId).then((res) => {
                setDeleteSuccessFlag(true);
            })
          }

          const goBack = (event) => {
            event.preventDefault()
                
            setProfileFlag(false);
            setScheduleFlag(false);
            setSuccessFlag(false);
            setAppointmentFlag(false);
            setUpdateAppFlag(false);
            setUpdateSuccessFlag(false);
            setDeleteSuccessFlag(false);
            setSuccessFlag(false);
            setDeleteSuccessFlag(false);
            setModalBoxFlag(false);
            setUpdateSuccessFlag(false);

            // navigate('/userhome/'+userId);
            navigate('/userhome', {state:{UserId:userId}});
          }

          return (
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
                                              <p className="text-muted credit"><AiOutlineUser size={20} onClick={viewProfile} />View Profile &nbsp;&nbsp;<AiTwotoneSchedule size={20}  onClick={mySchedules}/>My Appointments &nbsp;&nbsp;<FiPhone size={20} />Call Us: 080 2233447
                                              &nbsp;&nbsp;<FiLogOut size={20} onClick={onLogout} />Logout</p>
                                          </div>
                                      </NavItem>
                                      </Nav>
                              </Navbar.Collapse>
                    </Navbar>
                    
                    {
                        profileflag ? 
                        <div class="row align-items-center vh-100">
                                   <div class="col-5 mx-auto">
                                             <div class="card shadow border bg-dark text-white">
                                                       <div class="card-body ">
                                                                           <center>
                                                                           <img className = "resize" alt="user" src="user_avtar.png" />
                                                                           <h4 >{userDetails.name}</h4>
                                                                           <p >Date of Birth:{userDetails.dateOfBirth} <br />
                                                                           Email Id: {userDetails.email} <br/>
                                                                           Mobile No: {userDetails.mobileNumber} <br /> 
                                                                           Address: {userDetails.city},&nbsp;{userDetails.state},&nbsp;{userDetails.country} <br/>
                                                                           Pincode: {userDetails.pincode}
                                                                           </p>
                                                                           <Button variant="primary" type="submit" onClick={goBack} >⬅️ Go Back</Button>
                                                                           </center>
                                                       </div>
                                             </div>
                                   </div>
                         </div> 
                    : scheduleflag ?
                        slotDetails.length > 0 ? (
                            slotDetails.map((appointments) => {
                               return(
                                <center>
                                <div class="card" style={{ width: '30rem', margin: '30px'}}>
                                <div class="card text-center bg-dark text-white ">
                                                                    
                                                                   <h2 >Appointemnt Date:</h2><h3>{appointments.appointmentDate}</h3><br/>
                                                                   <h4>Slot: {appointments.slot}</h4> <br />
                                                                   <p>Booking Id: {appointments.id} <br /> 
                                                                   User Id: {appointments.userId} <br/>
                                                                   Coach Id: {appointments.coachId}</p>
                                                                   <Button variant="info" type="submit" onClick={() => flagUpdateSet(appointments.id)}> Reschedule Appointemnt</Button><br/>
                                                                   <Button variant="danger" type="submit" onClick={(e) => flagDeleteSet(appointments.id)}> Cancel Appointemnt</Button>
                                                                  
                                                                   
                                </div>
                                </div>
                            </center>

                               )
                            })
                           
                            
                        
                        ): <div>No Data Found</div> 
                        
                        : 

                        appointmentFlag ? 
                        <div class="row align-items-center vh-100">
                        <div class="col-5 mx-auto">
                                  <div class="card shadow border bg-dark text-white">
                                  <div class="card-body ">
                                    
                                     <h2>📝Proceed with your Appointment</h2><br/>
                                     <Form>
                                                <Form.Group controlId="formBasicDate">
                                                <Form.Label>Date of Appointment</Form.Label>
                                                <Form.Control type="date" onChange={(e) => {setSlotDate(e.target.value)}}/>
                                                </Form.Group>
                                                <br/>
                                                <Form.Group className="mb-3" controlId="formBasicTime">
                                                <Form.Label>Preferred Slot</Form.Label><br/>
                                                <Form.Check inline type='radio' label="9 AM to 10 AM" id = "9 AM to 10 AM" name = "time" value = "9 AM to 10 AM" onChange={(e) => { setSlotTime(e.target.value)}}/>
                                                <Form.Check inline type='radio' label="10 AM to 11 AM" id = "10 AM to 11 AM" name = "time" value = "10 AM to 11 AM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                <Form.Check inline type='radio' label="11 AM to 12 PM" id = "11 AM to 12 PM" name = "time" value = "11 AM to 12 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                <Form.Check inline type='radio' label="2 PM to 3 PM" id = "2 PM to 3 PM" name = "time" value = "2 PM to 3 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                <Form.Check inline type='radio' label="3 PM to 4 PM" id = "3 PM to 4 PM" name = "time" value = "3 PM to 4 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                <Form.Check inline type='radio' label="4 PM to 5 PM" id = "4 PM to 5 PM" name = "time" value = "4 PM to 5 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                </Form.Group>
                                           
                                        </Form>  
                                        <br/>                     
                                        <div className="d-grid gap-2">
                                            <Button variant="success" type="submit"  onClick = {bookAnAppointment}>Confirm Your Appointemnt</Button><br/>
                                            <p className="text-danger">{message}</p>              
                                        </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        :   

                        successFlag?
                        <div class="row align-items-center vh-100">
                        <div class="col-5 mx-auto">
                                  <div class="card shadow border bg-dark text-white">
                                  <div class="card-body ">
                                <center>

                                       <h1>Your appointment is scheduled successfully</h1>                      
                                       <br/>
                                       <div>
                                       <Button variant="primary" type="submit"  size="sm" onClick={goBack} >⬅️ Go Back</Button> 
                                       </div>
                                </center>
                            </div>
                            </div>
                        </div>
                        </div>
                        :
                            updateAppFlag?
                            <div class="row align-items-center vh-100">
                            <div class="col-5 mx-auto">
                                      <div class="card shadow border bg-dark text-white">
                                      <div class="card-body ">
                                        
                                         <h2>📝Reschedule your Appointment</h2><br/>
                                         <Form>
                                                    <Form.Group controlId="formBasicDate">
                                                    <Form.Label>Date of Appointment</Form.Label>
                                                    <Form.Control type="date" onChange={(e) => {setSlotDate(e.target.value)}}/>
                                                    </Form.Group>
                                                    <br/>
                                                    <Form.Group className="mb-3" controlId="formBasicTime">
                                                    <Form.Label>Preferred Slot</Form.Label><br/>
                                                    <Form.Check inline type='radio' label="9 AM to 10 AM" id = "9 AM to 10 AM" name = "time" value = "9 AM to 10 AM" onChange={(e) => { setSlotTime(e.target.value)}}/>
                                                    <Form.Check inline type='radio' label="10 AM to 11 AM" id = "10 AM to 11 AM" name = "time" value = "10 AM to 11 AM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                    <Form.Check inline type='radio' label="11 AM to 12 PM" id = "11 AM to 12 PM" name = "time" value = "11 AM to 12 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                    <Form.Check inline type='radio' label="2 PM to 3 PM" id = "2 PM to 3 PM" name = "time" value = "2 PM to 3 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                    <Form.Check inline type='radio' label="3 PM to 4 PM" id = "3 PM to 4 PM" name = "time" value = "3 PM to 4 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                    <Form.Check inline type='radio' label="4 PM to 5 PM" id = "4 PM to 5 PM" name = "time" value = "4 PM to 5 PM" onChange={(e) => {setSlotTime(e.target.value)}}/>
                                                    </Form.Group>
                                               
                                            </Form>  
                                            <br/>                     
                                            <div className="d-grid gap-2">
                                                <Button variant="success" type="submit" onClick = {rescheduleAppointment}>Confirm Your Appointemnt</Button><br/>
                                                <p className="text-danger">{message}</p>              
                                            </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        :
                            updateSuccessFlag?
                            <div class="row align-items-center vh-100">
                            <div class="col-5 mx-auto">
                                    <div class="card shadow border bg-dark text-white">
                                    <div class="card-body ">
                                    <center>

                                        <h1>Your appointment is re-scheduled successfully</h1>                      
                                        <br/>
                                        <div>
                                        <Button variant="primary" type="submit" size="sm" onClick={goBack} >⬅️ Go Back</Button> 
                                        </div>
                                    </center>
                                </div>
                                </div>
                            </div>
                            </div>
                        :
                            modalBoxFlag?
                                
                                <Modal show={true}>
                                    <ModalBody>Are you sure you need to cancel the appointment?</ModalBody>
                                    <ModalFooter>
                                    <button type="button" class="btn btn-danger" onClick={()=> setModalBoxFlag(false)}>No</button>
                                    <button type="button" class="btn btn-success" onClick = {cancelAppointment}>Yes</button>
                                    </ModalFooter>
                                </Modal>
        
                            :

                            deleteSuccessFlag ? 

                            <div class="row align-items-center vh-100">
                            <div class="col-5 mx-auto">
                                    <div class="card shadow border bg-dark text-white">
                                    <div class="card-body ">
                                    <center>

                                        <h1>Your appointment is cancelled successfully</h1>                      
                                        <br/>
                                        <div>
                                        <button type="button" class="btn btn-info" size="sm" onClick={goBack} >⬅️ Go Back</button> 
                                        </div>
                                    </center>
                                </div>
                                </div>
                            </div>
                            </div>

                        :
                           coaches.length > 0 ? (
                                coaches.map((coach) => {
                                    return(
                                        <center>
                                        <div class="card" style={{ width: '30rem', margin: '50px'}}>
                                        <div class="card text-center bg-dark text-white ">
                                                                            
                                                                           <h4 >{coach.name}</h4>
                                                                           <p >Coach Id:{coach.id} <br />
                                                                           Mobile No: {coach.mobileNumber} <br /> 
                                                                           Speciality: {coach.speciality} <br/>
                                                                           </p>
                                                                           <Button variant="primary" type="submit" onClick={() => flagSet(coach.id)}>Book Appointemnt</Button>
                                                                          
                                                                           
                                        </div>
                                        </div>
                                        </center>
                                        
                                    )
                                })
                            ) : <div>No Data Found</div> 
                    }
                </>
          )

}

export default UserHome;