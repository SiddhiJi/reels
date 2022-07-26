import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { db } from '../firebase';
import { collection, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { async } from '@firebase/util';


function Comments_display({ postData }) {

    const [comments, setComments] = useState([]);
    const [commentsids, setCommentsids] = useState([]);
    

    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "posts", postData.postid), (doc)=>{   //onSnapshot or setUser or retrieve data
          console.log(doc.data());
          setCommentsids(doc.data().comment);
        })
        return ()=>{
          unsub(); //clean up
        }
      },[postData]) //when postData state will change this useEffect will run twice
    
      useEffect(()=>{
        let tempArray = [];
        commentsids != undefined &&
        commentsids.map(async(cmid, idx)=>{
            const unsub = onSnapshot(doc(db, "comments" ,cmid), (doc)=>{   //onSnapshconstot or setUser
            tempArray.push(doc.data())
            setComments([...tempArray])
          console.log("cmmid",tempArray);
        })
      })
      },[commentsids])

    // useEffect(() => {

    //     (async() => {let arr = [];
    //     const querySnapshot = await getDocs(collection(db, "comments"))
        
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         arr.push(doc.data())
    //     });
    //     setComments([...arr])
    //     console.log(arr)})();
        
    // },[postData])
    // //this useeffect will run update when postdata is updated

    return (
        <div>
            {
                comments.map((comment) => (   //() in map as it contains html
                    
                    <div style={{ display: 'flex', border: '1px solid white' }} key={postData.postid}>
                        <Avatar alt="Remy Sharp" src={comment.uProfileImg} sx={{ margin: "0.5rem" }} />
                        <p><span style={{ fontWeight: 'bold' }}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                    </div>
                    // <p>kkk</p>
                ))
            }
        </div>
    )
}

export default Comments_display