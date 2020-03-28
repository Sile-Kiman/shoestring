import React, { useState, useEffect } from "react";
import './login.css'
import $ from 'jquery';
import Alert from '../components/Alert/alert'
import Nav from '../components/navbar'
import API from '../utils/api'
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';
import Landing from "./Landing";

function Login() {
   const [loginObject, setLoginObject] = useState({
        email: "",
        password: "",
    })

 //function to Handle the  input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setLoginObject({ ...loginObject, [name]: value })
        console.log("input ", { name, value })
         
    };

    //Function to reset the form to empty fields
    const clearForm = () => {
        setLoginObject({
            email: "",
            password: "",

        })
    }

    const validate = (err) =>{
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }


    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }

  
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser() {
    $.post("/api/login", {
        email: loginObject.email,
        password: loginObject.password
    })
      .then(function(result) {
          console.log("result", result )
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(validate);
     
  }
 

    //Handle the form subission- save it to the database on submit
 function handleLoginOnsubmit(event) {
        event.preventDefault();
        console.log(loginObject.email, loginObject.password)
         if (!{...loginObject}) {
            return
         }  
        
        loginUser({...loginObject});
        clearForm();
   }; 
          

    return (
        <>
        <Nav/>
       
        <div className='container tile is-4 is-parent box'>
            <div className="tile is-child">
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email"
                            // className={loginObject.email === '' ? "input error" : " input"}
                            onChange={handleInputChange}
                            name="email"
                            placeholder="Email (required)"
                            value={loginObject.email} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password"
                            // className={loginObject.password === '' ? "input error" : " input"}
                            onChange={handleInputChange}
                            name="password"
                            placeholder="Password (required)"
                            value={loginObject.password} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <button className="button is-success loginbtn"
                            onClick={handleLoginOnsubmit}>
                            {/* onClick={() => window.location.reload()> */}
                            Login
                        </button>
                    </p>
                    <h5><a href="#">Forgot Password?</a></h5>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;