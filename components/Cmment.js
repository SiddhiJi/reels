import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

function Cmment({ postData, userdata }) {
    const [text, setText] = useState('');
    let uid = uuidv4(); //gives unique id when called
    const handleClick = async () => {
        let obj = {
            text: text,
            uProfileImg: userdata.photourl,
            uName: userdata.name
        }
        await setDoc(doc(db, "comments", uid), obj);
        await updateDoc(doc(db, "posts", postData.postid), { //updateDoc puts new uid of reels in posts array
            comment: arrayUnion(uid)   //only entry to be updated , arrayUnion pushes in prev reels          
        })
        // console.log("comment added in particular post array");
        setText('');
    }

    return (
        <div style={{ width: '100%' }}>
            <TextField id="filled-basic" label="Comment" variant="outlined" size='small' sx={{ width: '70%' }} value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="contained" onClick={handleClick}>Post</Button>
        </div>
    )
}

export default Cmment