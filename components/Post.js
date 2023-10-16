import { Avatar } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/AuthWrapper';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Cmment from './Cmment';
import Comments_display from './Comments_display';

function Post({ postData, userdata }) {
  // console.log("kkk",postData);
  // console.log("bbb",userdata);
  const { user } = useContext(AuthContext); //it brings current user
  const [like, setLike] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (postData.likes.includes(user.uid)) {
      setLike(true) //sets the like state
    }
    else {
      setLike(false)
    }
  })

  const handleLike = async () => {
    if (!like) {
      await updateDoc(doc(db, "posts", postData.postid), { //updateDoc puts new uid of reels in posts array
        likes: arrayUnion(user.uid)   //only entry to be updated , arrayUnion pushes in prev reels
      })
    }
    else {
      await updateDoc(doc(db, "posts", postData.postid), { //updateDoc puts new uid of reels in posts array
        likes: arrayRemove(user.uid)   //only entry to be updated , arrayUnion pushes in prev reels
      })
    }
  }

  const handleAudio = (e) => {
    e.preventDefault(); //disable default mute of video
    e.target.muted = !e.target.muted;
  }

  

  return (
    <div key={postData.postid}>
      <div className='post-container' >
        {/* inner div hold current playing video */}
        <video src={postData.postUrl} style={{width:'100%'}} onClick={handleAudio} loop></video>
        <div className='videos-info'>
          {/*  2 div for name and like*/}
          <div className='avatar-container'>
            {/* avatar  =copied from navnar.js */}
            <Avatar alt="Remy Sharp" src={postData.profileUrl} style={{marginLeft:'26px'}} sx={{ margin: "0.5rem" }} />
            <p style={{color: 'white', fontWeight:'bold', marginLeft:'10px'}}>{postData.profileName}</p>
          </div>
          <div className='post-like'>
            <FavoriteIcon fontSize='large' style={like ?
              { color: "red",marginRight: '18px' } : { color: "white",marginRight: '2px' }} onClick={handleLike} />
            <div style={{marginRight:'18px'}}>
            {postData.likes.length > 0 && postData.likes.length}
            </div>

            <ChatIcon style={{ color: "black",marginRight: '18px' }} onClick={() => handleClickOpen(postData.postid)} />
            <Dialog
              open={open == postData.postid}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true} maxWidth="md"
            >
              <div className='modal-container'>
                <div className='video-modal-container'>
                  <video src={postData.postUrl} muted="muted" onClick={handleAudio} autoPlay={true} loop ></video>
                </div>
                <div className='comment-modal-container'>
                  <Card className='card1' style={{padding:'1rem'}}>
                  <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Comments💌 so far</div>
                   <Comments_display postData={postData}/>
                   
                  </Card>

                  <Card variant='outlined' className='card2'>
                    <Typography style={{textAlign:'center', padding:'0.2rem'}}>{postData.likes.length == 0?'':`💖liked by ${postData.likes.length} users`}</Typography>
                    <div style={{display:'flex'}}>
                      <Cmment postData={postData} userdata={userdata}/>
                    </div>
                  </Card>
                </div>

              </div>
            </Dialog>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;