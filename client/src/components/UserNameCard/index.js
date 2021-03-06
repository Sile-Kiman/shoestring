import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';


function UserNameCard(currentUser) {
    const [currentUserObj, setCurrentUserObj] = useState({
        currentUser: httpClient.getCurrentUser()
   })

   useEffect(() => {
    onLoginSuccess()
    //settingUpCurrentUser ()
    work()
    }, [])

    const work = () =>{
        if(currentUser===null){
        //<Redirect from='home' to='/'/>
        window.location.replace('/')
        }
         
      }
    
    currentUser =[
        {
        name:currentUserObj.currentUser.name,
        // lastName: currentUserObj.currentUser.lastName,
        phone: currentUserObj.currentUser.phone,
        email: currentUserObj.currentUser.email,
        password: currentUserObj.currentUser.password,
    }]
    
    const onLoginSuccess= (currentUser) =>{
        setCurrentUserObj({ currentUser: httpClient.getCurrentUser(currentUser) })
         console.log("currentUserObj " , currentUserObj )
     }

    return (
        <>
        <p className="title">
            {currentUser[0].name}
        </p>
        </>
    );
}

export default UserNameCard;