import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';
// const db = require("../../../../models")


function AddImage(props, currentUser) {
    const [currentUserObj, setCurrentUserObj] = useState({
        currentUser: httpClient.getCurrentUser()

    })

    //image and loading states
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'shoestring')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/drz1p9bbx/image/upload', {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
                // .then(req, res =>  {
                //     db.User
                //      .findOneAndUpdate({ _id: req.params.id }, req.body)
                //      .then(dbModel => res.json(dbModel))
                //      .catch(err => res.status(422).json(err));
                //  })
        // }
        console.log(file.public_id)
        console.log(file.secure_url)

        //Restructuring the data received from history 
        currentUser = [
            {
                firstName: currentUserObj.currentUser.firstName,
                lastName: currentUserObj.currentUser.lastName,
                phone: currentUserObj.currentUser.phone,
                email: currentUserObj.currentUser.email,
                password: currentUserObj.currentUser.password,
                image: file.secure_url
            }]
        console.log("current user" + currentUser);

        // Load the available token on pageload from local storage
        //  useEffect(() => {
        //     onLoginSuccess();
        //     handleImage();

        // }
        // , [])

        const onLoginSuccess = (user) => {
            setCurrentUserObj({ currentUser: httpClient.getCurrentUser(user) })
            //  console.log("currentUserObj " , currentUserObj )
            // console.log("user " , currentUserObj.currentUser.firstName)
        }
    }
    console.log(image)
    // .then {
    //require database, find user and update
    //console log id and url to update table
    // }

    function handleImage(event) {
        const { name, value } = event.target;
        setCurrentUserObj({ ...currentUser, [name]: value })
        console.log("input ", { name, value })
    };


    return (
        <div>
            {/* <h3>Upload image</h3> */}
            {/* <figure className="image is-128x128">
                <img className="is-rounded" id="userPic" src={image} onChange={uploadImage} />
            </figure> */}
            <br />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                    <figure className="image is-128x128">
                        {/* <placeholder>Here we are</placeholder> */}
                        <img className="is-rounded" src={image} />
                    </figure>
                )}
            <br />

            <input type="file"
                name="file"
                placeholder="Upload image"
                value={currentUser.image}
                onChange={uploadImage}
            // onChange={handleImage}
            />
            {/* {loading ? (
                <h3>Loading...</h3>
            ) : (
                    <img src={image} style={{ width: '300px' }} />
                )} */}

        </div>
    )
            }          

export default AddImage;