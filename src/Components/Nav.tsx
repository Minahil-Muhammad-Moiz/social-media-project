import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

const Nav = () => {
  const [user] = useAuthState(auth)
  return (
    <>
    <Link to='/'>Home</Link>
    <Link to='/login'>Login</Link>
    <div>
      <p>{user?.displayName}</p>
      <img src={user?.photoURL || 'profile picture'}/>
    </div>
    </>
  )
}

export default Nav