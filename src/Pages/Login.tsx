import React from 'react'
import { auth, provider } from '../Config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

    const googleSignin = async()=>{
      const result = await signInWithPopup(auth, provider)
      console.log(result);
      navigate('/')
    }
  return (
    <div className='loginPage'>
      <h1>Login</h1>
        <button onClick={googleSignin} className='login-with-google-btn'>SignIn with Google</button>
    </div>
  )
}

export default Login