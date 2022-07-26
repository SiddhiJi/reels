import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../context/AuthWrapper';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Post from '../components/Post'
function Feed() {

  const {user} = useContext(AuthContext);
  const[userdata,setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{   //onSnapshot or setUser
      console.log(":))))",doc.data());
      setUserData(doc.data());
    })
    return ()=>{
      unsub(); //clean up
    }
  },[user]) //when user state will change this useEffect will run twice

  useEffect(()=>{
    const unsub = onSnapshot(query(collection(db, "posts"),orderBy("timeStamp","desc")), (snapshot)=>{   //onSnapshot or setUser
      let tempArray = [];
      snapshot.docs.map((doc)=>{
        tempArray.push(doc.data())
      })
      setPosts([...tempArray])
      console.log("ooo",tempArray);
    })
    return ()=>{
      unsub(); //clean up
    }
  },[])
  const callback = (entries)=>{
    entries.forEach((entry)=>{
      let ele = entry.target.childNodes[0];
      console.log("elee",ele);
      ele.play().then(()=>{
        if(!ele.paused && !entry.isIntersecting)
          ele.pause()
      })
    })
  }
    let observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
      const elements = document.querySelectorAll(".post-container");
      elements.forEach((element)=>{
        observer.observe(element);
      })
      return()=>{
        observer.disconnect(); //remove attached eventlisteners
      }
    },[posts])

  return (
    <div className='feed-container'>
      <Navbar userdata={userdata}/>  
      {/* sending userdata received from db to navbar as a prop for avatar */}
      <Upload userdata={userdata}/>
      <div className='videos-container'>

        {
          posts.map((post)=>{
            return <Post postData={post} userdata={userdata} key={post}/>
          })
        }

      </div>
    </div>
  )
}

export default Feed