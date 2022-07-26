import React, { useState } from 'react'

import Button from '@mui/material/Button';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';


function Upload({ userdata }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleChange = (e)=>{
        const file = e.target.files[0]; //will give selected file
        if(file == null){
            setError("please select a file :)");
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        if((file.size / (1024*1024) )> 20){ //50 mb
            setError("please select a smaller file :)");
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        let uid = uuidv4(); //gives unique id when called
        setLoading(true);

        const storageRef = ref(storage, `${userdata.uid}/posts/${uid}`);
        // storageref stores location in which file will be store
  
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            setError(error.message);
            setTimeout(()=>{
                setError('')
            },2000);
            return;
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              //making obj of entered data by user so that we can use this info futher
              //in our pages like uploaded photo and name in profile page
              let obj = {
                likes: [],
                comment:[],
                postid: uid,
                postUrl: downloadURL,
                profileName: userdata.name,
                profileUrl: userdata.photourl,
                uid: userdata.uid,
                timeStamp: serverTimestamp() //when it was uploaded
              }
              console.log(obj);
              await setDoc(doc(db, "posts", uid), obj);
              console.log('post added in post collection');
              await updateDoc(doc(db, "users", userdata.uid),{ //updateDoc puts new uid of reels in posts array
                posts: arrayUnion(uid)   //only entry to be updated , arrayUnion pushes in prev reels
              })
              //firestore
              console.log("doc added");
              setLoading(false);
              setProgress(0);
            });
          }
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            {
                error != '' ? <Alert severity="error">{error}</Alert> :
                    <Button variant="outlined" startIcon={<LocalMoviesIcon />} component="label"
                        style={{ marginTop: '1rem' }}>
                        {/* if component is label of button tag it takes input , if span it not takes
                            inline css attr in camel case here and in react while in css it was separated by - */}
                        Upload
                        <input hidden accept="video/*" multiple type="file" onChange={handleChange}/>
                        {/* hidden prop to hide choose files options */}
                    </Button>
            }

            {
                loading == true ? <LinearProgress variant="determinate" value={progress} style={{ color: 'blue' }} /> : <div/>
            }
        </div>
    )
}

export default Upload