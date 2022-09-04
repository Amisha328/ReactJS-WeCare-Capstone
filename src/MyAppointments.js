import React from 'react';
import './css/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './Footer';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { FiLogOut, FiPhone } from "react-icons/fi";
import { AiTwotoneSchedule, AiOutlineUser } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';

function MyAppointments() {
          let navigate = useNavigate();
          let params = useParams();
          const onLogout = (event) => {
                    event.preventDefault()
                    navigate('/userlogin');
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
                                              <p className="text-muted credit"><AiOutlineUser size={20} />View Profile &nbsp;&nbsp;<AiTwotoneSchedule size={20}  />My Schedules &nbsp;&nbsp;<FiPhone size={20} />Call Us: 080 2233447
                                              &nbsp;&nbsp;<FiLogOut size={20} onClick={onLogout} />Logout</p>
                                          </div>
                                      </NavItem>
                                      </Nav>
                              </Navbar.Collapse>
                    </Navbar>
                    <Footer/>
          </>
     )
}

export default MyAppointments;