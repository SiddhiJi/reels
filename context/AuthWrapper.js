import React, { useEffect } from 'react'

import {createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../firebase'

export const AuthContext = React.createContext(); // provides features on the wall
function AuthWrapper({children}) {
    // console.log("hello from wall");

    const[user, setUser] = React.useState('');
    const[loading, setLoading] = React.useState(true);   //if logged in before sometime

    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{  //it tells if any user id is logged in or not by checking in backend which is with Google(server)
        //if logged in prev. then it gets user and sets it in state else not set it is user state.
        if(user){ //means user is logged in
          setUser(user);
        }
        else{
          setUser('');
        }
      })
      setLoading(false);
    },[]) //after return this useEffect runs once and makes loading false

    function login(email, password)
    {
        // setUser(user); it is done by onAuthStateChanged() itself when auth is changed inside login,logout,forgot,signup so it also sets user
        //state with user if sign in else user state with null if sign out
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
      //setUser('') is itself set by onAuthStateChanged().
      return signOut(auth);
    }

    function forgot(email){
      return sendPasswordResetEmail(auth, email)
    }

    function signup(email, password){
      return createUserWithEmailAndPassword(auth, email, password);
    }

    //functions of context i.e adding features on wrapper wall therefore these func. go to each page
    const store = {
        login,
        user,
        loading,
        logout,
        forgot,
        signup
    }
    // console.log('booommmm');

  return (
    <AuthContext.Provider value={store}>
{/* as now these ele are inside wall therefore they are children */}
      {!loading && children}
{/*when we first open a website it takes sometime to check if we are logined or not by usin backed data store till then loading is true 
   as soon as it completes check of logged in or not then acc. children execute*/}
    </AuthContext.Provider>
  )
}

export default AuthWrapper