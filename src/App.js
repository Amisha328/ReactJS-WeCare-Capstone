import Home  from './Home';
import CoachSignUp from './CoachSignUp'
import CoachLogin from './CoachLogin';
import UserSignUp from './UserSignup';
import UserLogin from './UserLogin';
import CoachHome from './CoachHome';
import UserHome from './UserHome';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/coachsignup' element={<CoachSignUp />}></Route>
          <Route path='/coachlogin' element={<CoachLogin />}></Route>
          <Route path='/usersignup' element={<UserSignUp />}></Route>
          <Route path='/userlogin' element={<UserLogin />}></Route>
          {/* <Route path='/coachhome/:id' element={<CoachHome/>}></Route> */}
          <Route path='/coachhome' element={<CoachHome/>}></Route>
          {/* <Route path='/userhome/:id' element={<UserHome/>}></Route> */}
          <Route path='/userhome' element={<UserHome/>}></Route>
          {/* <Route path='/coachschedules/:id' element={<CoachHome/>}></Route>
          <Route path='/coachviewprofile/:id' element={<CoachHome/>}></Route> */}
          <Route path='/coachschedules' element={<CoachHome/>}></Route>
          <Route path='/coachviewprofile' element={<CoachHome/>}></Route>
          {/* <Route path='/userappointments/:id' element={<UserHome/>}></Route>
          <Route path='/userappointment/:id' element={<UserHome/>}></Route>
          <Route path='/userviewprofile/:id' element={<UserHome/>}></Route> */}
          <Route path='/userappointments' element={<UserHome/>}></Route>
          <Route path='/userappointment' element={<UserHome/>}></Route>
          <Route path='/userviewprofile' element={<UserHome/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
