import {Routes,Route} from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Contact from './Contact'
import About from './About'
import NavBar from './NavBar'
import '../css/Landing.css'
function Landing(){
   return(
    <>
    <NavBar></NavBar>
   <main className="landing">
     <Routes>
       <Route path="/" element={<h1>This is the Landing Page</h1>}></Route>
       <Route path="/registration" element={<Registration/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/about" element={<About/>}></Route>
     </Routes>
   </main>
 </>
   )
}
export default Landing