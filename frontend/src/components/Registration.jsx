import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Registration.css'
function Registration() {
    const[username,setUsername]= useState('')
    const[password,setPassword]= useState('')
    const navigate=useNavigate()
    function register(e)
    {

        e.preventDefault();
        if(username.trim()==='' || password.trim()==='')
        {
            alert("Please fill all the details");
            return;
        }
        const users=JSON.parse(localStorage.getItem("users")) || [];
        const exists=users.find(
            (user)=>user.username===username.trim().toLowerCase()
        );
        if(exists)
        {
            alert("User already exists");
            return;
        }
        const newuser={
            username:username.trim().toLowerCase(),
            password:password
        };
        users.push(newuser);
        localStorage.setItem("users",JSON.stringify(users));
        alert("Registration successful");
        navigate('/login')
        setUsername('')
        setPassword('');
    }
    return (
        <>
            <form onSubmit={register} className="reg-form">

                <input type="text"
                    placeholder="Username"
                    className="input-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <input type="password"
                    placeholder="Password"
                    className="input-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }} />

                <button type='submit'
                    className="form-btn">Sign Up</button>

            </form>
        </>
    )
}
export default Registration