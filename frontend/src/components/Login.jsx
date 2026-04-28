import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
function Login(){
    const[username,setUsername]= useState('');
    const navigate = useNavigate();
    const[password,setPassword]=useState('');
    function login(e)
    {
        e.preventDefault();
        if(username==='' || password==='')
        {
            alert("Please fill all the details");
            return;
        }
        const users= JSON.parse(localStorage.getItem("users")) || [];
        const found=users.find(
            (user)=> user.username===username.trim().toLowerCase() && user.password===password
        );
        if(found)
        {
            alert("Login Successful");
            navigate('/about')
        }else{
            alert("Invalid Credentials")
        }

    }
    return(
        <>
          <form onSubmit={login} className="login-form">

            <input type="text" 
            placeholder="Username" 
            className="input-username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
            
            <input type="password" 
            placeholder="Password" 
            className="input-password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}/>

            <button type='submit' 
            className="form-btn">Sign In</button>
             
          </form>
        </>
    )
}
export default Login