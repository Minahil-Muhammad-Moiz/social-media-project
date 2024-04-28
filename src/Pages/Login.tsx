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
    <div>
      <h1>Login</h1>
        <button onClick={googleSignin}>SignIn with Google</button>
    </div>
  )
}

export default Login