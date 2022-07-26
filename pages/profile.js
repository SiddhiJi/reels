import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import ProfileComp from '../components/ProfileComp'
import { AuthContext } from '../context/AuthWrapper';

function profile() {

    const { user } = useContext(AuthContext);
    console.log(user);

const Redirect = ()=>{
  const router = useRouter();
  router.push('/login');
  return null;
}

  return (
    <>
    {
        user?.uid? <ProfileComp/> : <></>
    }
    </>
  )
}

export default profile