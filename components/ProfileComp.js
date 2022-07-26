import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthWrapper';
import { db } from '../firebase';
import Navbar from './Navbar'
function Profile() {
  const {user} = useContext(AuthContext);
  const[userdata,setUserData] = useState({});
  const[postIds,setpostIds] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{   //onSnapshot or setUser or retrieve data
      console.log(doc.data());
      setUserData(doc.data());
      setpostIds(doc.data().posts);
    })
    return ()=>{
      unsub(); //clean up
    }
  },[user]) //when user state will change this useEffect will run twice

  useEffect(()=>{
    let tempArray = [];
      postIds.map(async(postid, idx)=>{
        const unsub = onSnapshot(doc(db, "posts" ,postid), (doc)=>{   //onSnapshconstot or setUser
        tempArray.push(doc.data())
        setPosts([...tempArray])
      console.log("ooo",tempArray);
    })
  })
  },[postIds])


  return (
    <div>
      <Navbar/>  
      {/* it displays navbar in profile page also */}
      <div className='profile-upper'>
        <img src={userdata?.photourl} 
        style={{height:'8rem', width:'8rem', borderRadius:"50%"}}></img>
        <div style={{flexBasis:'40%'}} >
          <h1>{userdata.name}</h1>
          <h3>Posts: {userdata?.posts?.length}</h3>
          {/* ? for safety */}
        </div>
      </div>

      <hr/>

      <div className='profile-videos'>
        {
          posts.map((post)=>( //map has () as its sending html
            <video src={post.postUrl}/>
          ))
        }
        
      </div>
    </div>
  )
}

export default Profile;