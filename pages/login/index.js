import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Image from 'next/image'; //use this Image tag instead of img tag for better optimization
import insta from '../../assets/insta.jpg';
import bg1 from '../../assets/bg1.png'
import bg2 from '../../assets/bg2.png'
import bg3 from '../../assets/bg3.png'
import { Carousel } from 'react-responsive-carousel';  // and importing its css inside _app.js
import { AuthContext } from '../../context/AuthWrapper';
import { setLogLevel } from 'firebase/app';
import { useRouter } from 'next/router';
import Link from 'next/link'

function Index() {

    //making states of email and pass
    const router = useRouter(); //conditional routing or programmatic redirect
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setloading] = React.useState(false);

    const { login, user } = useContext(AuthContext);   //using login functionality of wall
    console.log('login', user);
    const handleClick = async () => {
        console.log(email, password);
        try {
            setloading(true);
            setError('');
            await login(email, password);
            // using asunc as it wil go to backend and usingContext i.e a feature of wall(Wrapper) made
            console.log('logged in');
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
        if (user?.uid) { //if user is logged in     <<-- programmatic redirect
            router.push('/'); //goes to feed page if user is already loggedin
        }
        else {
            console.log("user not logged in");
        }
    }, [user])

    return (
        <div className='login-container'>

            <div className='bg'>
                <div className='car'>
                    <Carousel showIndicators={false}
                        showThumbs={false}
                        showArrows={false}
                        showStatus={false}
                        infiniteLoop={true}
                        interval={2000}
                        autoPlay={true}
                    >
                        <Image src={bg1}></Image>
                        <Image src={bg2}></Image>
                        <Image src={bg3}></Image>
                    </Carousel>
                </div>
            </div>

            <div>
                <div className='login-card'>

                    <Image src={insta}></Image>

                    <TextField id="outlined-basic" label="Email"
                        variant="outlined" fullWidth size='small'
                        margin='dense' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <TextField id="outlined-basic" label="Password"
                        variant="outlined" fullWidth size='small'
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {/* js logic in {} brackets */}
                    {
                        error != '' && <div style={{ color: 'red' }}>{error}</div>
                    }

                    <Button variant="contained" component="span" fullWidth
                        style={{ marginTop: '1rem' }} onClick={handleClick} disabled={loading}>
                        {/* if component is label of button tag it takes input , if span it not takes
                         inline css attr in camel case here and in react while in css it was separated by - */}
                        Login
                        <input hidden accept="image/*" multiple type="file" />
                        {/* hidden prop to hide choose files options */}
                    </Button>

                    <Link href='/forgotPassword'><div style={{ color: 'blue', marginTop: '0.5rem' }}>Forgot Password ?</div></Link>

                </div>
                <div className='bottom-card'>
                    Don&apos;t have an account? <Link href='/signup'><span style={{ color: 'blue' }}>Sign up</span></Link>
                    {/* span tag is used to add links */}
                </div>
            </div>
        </div>
    )
}

export default Index