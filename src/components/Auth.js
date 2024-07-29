import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
export const Auth = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  console.log(auth?.currentUser?.email)

  const signIn = async () => {
    try{

      await createUserWithEmailAndPassword(auth, email, pass)
    }catch(e){
      console.error(e);
    }
  };


  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleProvider)
    }catch(e){
      console.error(e);
    }
  }

  const logout = async () => {
    try{
      await signOut(auth)
    }catch(e){
      console.error(e);
    }
  }

  return(
    <div>
      <input placeholder="Email..." onChange={(e) => {setEmail(e.target.value)}}/>
      <input placeholder="Password..." type='password' onChange={(e) => {setPass(e.target.value)}} />
      <button onClick={signIn}>Login</button>

      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <button onClick={logout}> Logout</button>
    </div>
  )
}