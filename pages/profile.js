import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import ProfileComp from '../components/ProfileComp'
import { AuthContext } from '../context/AuthWrapper';

function Profile() {

  const {user} = useContext(AuthContext)
  console.log('oooou',user);

  const Redirect = ()=>{
    const router = useRouter();
    router.push('/login');
    return null;
  }

  return (
    <>
    {
        user?.uid? <ProfileComp/> : <h2>not access without login</h2>
    }
    </>
  )
}

export default Profile