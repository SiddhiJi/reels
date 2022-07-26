import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Image from 'next/image' //use this Image tag instead of img tag for better optimization
import insta from '../../assets/insta.jpg'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthWrapper';
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {db, storage} from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

function Index() {

  const router = useRouter(); //conditional routing or programmatic redirect
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setloading] = React.useState(false);

  const { signup, user } = useContext(AuthContext);

  const handleClick = async () => {
    console.log("iiiiii",email, password, name, file);
    console.log(("iiiiii",user));
    try {
      setloading(true);
      setError('');
      const user = await signup(email, password);
      // using asunc as it wil go to backend and usingContext i.e a feature of wall(Wrapper) made
      console.log('signed up');
//further code in try block taken from https://firebase.google.com/docs/storage/web/upload-files site to store uploaded image
      const storageRef = ref(storage, `${user.user.uid}/profilePic`);
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
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            //making obj of entered data by user so that we can use this info futher
            //in our pages like uploaded photo and name in profile page
            let obj = {
              name: name,
              email: email,
              uid: user.user.uid,
              photourl: downloadURL,
              posts:[]
            }
            await setDoc(doc(db, "users", user.user.uid), obj);
            console.log('document added');
          });
        }
      );

    }
    catch (err) {
      console.log('error');
      setError(err.message);
      setTimeout(() => {
        setError('') //remove error from state after 2 sec.
      }, 2000)
    }
    setloading(false);
  }

  useEffect(() => {
    if (user) {
      router.push('/'); //goes to feed page if user is already loggedin
    }
    else {
      console.log("user not logged in");
    }
  }, [user])

  return (
    <div className='signup-container'>
      <div className='signup-card'>

        <Image src={insta}></Image>

        <TextField id="outlined-basic" label="Email"
          variant="outlined" fullWidth size='small'
          margin='dense' value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField id="outlined-basic" label="Password"
          variant="outlined" fullWidth size='small'
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <TextField id="outlined-basic" label="Full Name"
          variant="outlined" fullWidth size='small'
          margin='dense' value={name} onChange={(e) => setName(e.target.value)} />

        <Button variant="contained" component="label" fullWidth
          style={{ marginTop: '1rem' }} onChange={(e) => { setFile(e.target.files[0]) }}>
          {/* if component is label of button tag it takes input , if span it not takes
       inline css attr in camel case here and in react while in css it was separated by - */}
          Upload
          <input hidden accept="image/*" multiple type="file" />
          {/* hidden prop to hide choose files options */}
        </Button>


        <Button variant="contained" component="span" fullWidth
          style={{ marginTop: '1rem' }} onClick={handleClick} disabled={loading}>
          {/* if component is label of button tag it takes input , if span it not takes
       inline css attr in camel case here and in react while in css it was separated by - */}
          Sign up
          <input hidden accept="image/*" multiple type="file" />
          {/* hidden prop to hide choose files options */}
        </Button>

      </div>
      <div className='bottom-card' style={{ display: 'flex', top: '38rem' }} >
        Already have an account? <Link href='/login'><span style={{ color: 'blue' }}>Login</span></Link>
        {/* span tag is used to add links */}
      </div>
    </div>
  )
}

export default Index