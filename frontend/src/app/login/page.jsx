"use client"
import React from 'react'
import axios from "axios"
import {firebaseAuth} from '@/utils/firebaseConfig'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {FcGoogle} from 'react-icons/fc'
import { BASE_URL } from '@/utils/base_url'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { updateUsername,updateAvatar, updateEmail} from '@/store/slices/userSlice'

export default function page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogin = async()=>{
     const provider = new GoogleAuthProvider()
     
     const firebaseData = await signInWithPopup(firebaseAuth,provider)
     const username = firebaseData.user.displayName
     const email = firebaseData.user.email
     const payload = {
        username: username, 
        email: email
     }
     const {data} = await axios.post(`${BASE_URL}/user/login`,payload)
     dispatch(updateEmail(email))
     if(data.message === "User not found")
     {
        
        router.push('/onboarding')
     }
     else
     {
      dispatch(updateUsername(username))
      dispatch(updateAvatar(avatar))
      router.push("/chat")
     }
  }
  return (
    <div className="bg-background h-screen w-screen p-5 ">
      <img src={"/whatsapp.gif"} className="absolute left-[50%] translate-x-[-50%]"/>
      <div className="absolute left-[50%] top-[80%] translate-x-[-50%] translate-y-[-50%]
                     text-white h-12 w-60 bg-black p-2 text-md flex 
                       justify-center items-center cursor-pointer">
          
          <FcGoogle size={40}/>
          <span className="pl-4" onClick={handleLogin}>Continue with Google</span>
      </div>
    </div>
  )
}


