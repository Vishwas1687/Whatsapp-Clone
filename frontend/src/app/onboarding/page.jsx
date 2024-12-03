"use client"
import React,{useState, useRef, useEffect} from 'react'
import { FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast'
import Webcam from "react-webcam";
import axios from 'axios'
import {useSelector} from 'react-redux'
import { BASE_URL } from '@/utils/base_url';
import { useRouter } from 'next/navigation';

export default function page() {
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false)
  const [xCoordinate,setXCoordinate] = useState('')
  const [yCoordinate,setYCoordinate] = useState('')
  const [webCamOpen,setWebCamOpen] = useState(false)
  const [photo, setPhoto]=useState('')
  const email = useSelector((state)=>state.user.email)
  const [photoOpen,setPhotoOpen] = useState(false)
  const contextMenuRef = useRef(null)
  const webCamRef = useRef(null)
  const router = useRouter()

  const [username,setUsername] = useState('')
  const [about, setAbout] = useState('')

  const handleAvatarClick = (e)=>{

      setAvatarDropdownOpen(true)
      console.log(e.pageX)
      console.log(e.pageY)
      setXCoordinate(e.pageX)
      setYCoordinate(e.pageY)

  }

  const handleTakePhoto = ()=>{
    setWebCamOpen(true)
  }

  const handleUploadPhoto = ()=>{
    const photoInput = document.getElementById('photo-picker')
    photoInput.click()
    photoInput.onchange = (e)=>{
      setPhoto(URL.createObjectURL(e.target.files[0]))
    }

  }

  const handleRemovePhoto = ()=>{
    setPhoto(false)
  }

  const handleScreenshot = ()=>{
    const imageSrc = webCamRef.current.getScreenshot()
    setPhoto(imageSrc)
    setPhotoOpen(true)
    setWebCamOpen(false)
  }

  const handlePhotoConfirm = ()=>{
    setPhotoOpen(false)
  }

  const handleOnboarding = async()=>{
    if(!username || !about)
    {
      toast.error("Fill in required fields")
      return;
    }
    const payload = {
      email: email,
      username: username,
      about: about,
      photo: photo
    }
    const {data} = await axios.post(`${BASE_URL}/user/register`,payload)
  }

  useEffect(()=>{
     const handleOutsideClick = (e)=>{
        if(avatarDropdownOpen)
        {
          if(e.target.id !== "avatar")
            if(contextMenuRef.current && !contextMenuRef.current.contains(e.target))
            {
              setAvatarDropdownOpen(false)
            } 
        }
     }

    document.addEventListener('click',handleOutsideClick)
    return ()=>{
      document.removeEventListener('click',handleOutsideClick)
    }
  },[avatarDropdownOpen])

  useEffect(()=>{
    if(!email)
      router.push('/login')
  },[])
  
  return (
    <div className ="border-box p-2 bg-background h-screen w-screen">
      <img src={"/whatsapp.gif"} className="absolute left-[50%] 
                translate-x-[-50%] h-[20rem] w-[20rem]"/>
      <div className='absolute text-white top-[65%] left-[50%] w-[25rem]
                       translate-y-[-50%] translate-x-[-50%] h-60 p-2'>
        <h1 className='text-4xl text-center mb-4'> Onboarding </h1>
        <div className="flex justify-between">
        <div className='flex flex-col items-center text-left'>
          <div className='mb-8'>
            <span className="mr-2 text-xl">Username*</span>
            <input className="w-32 bg-input-background text-white border-2
                             border-input-background rounded-md focus:outline-none p-1"
                    value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className='flex items-center'>
            <span className='mr-10 text-xl'>About*</span>
            <textarea className="w-32 text-white bg-input-background 
                              border-2 border-input-background rounded-md focus:outline-none p-1"
                    value={about} onChange={(e)=>setAbout(e.target.value)}/>
          </div>
          <div className='mt-4'>
            <button className='bg-success-button text-white p-2 rounded-md w-60'
              onClick={handleOnboarding}>
              Register
            </button>
          </div>
          
        </div>
        <div className='relative' onClick = {(e)=>handleAvatarClick(e)} ref={contextMenuRef}
          id="avatar">
          <img src={`${photo ? photo: '/default_avatar.png'}`} 
              className={`h-32 w-32 cursor-pointer hover:bg-background-hover`}
                          />
          {!photo && <FaCamera className='absolute top-[50%] left-[50%] h-8 w-8 translate-x-[-50%] 
                              translate-y-[-50%]'/>}
        </div>
        
        </div>
      </div>

      

      {avatarDropdownOpen && (
        <div className={`z-10 w-48 h-28 bg-background absolute  text-white
                         p-2 text-md cursor-pointer border-black border-1
                         avatar`} 
                          
                         style = {{"left":`${xCoordinate}px`,
                                   "top":`${yCoordinate}px`}}>

        <ul>
          <li className='hover:bg-background-hover p-2' onClick={handleTakePhoto}>
            Take Photo
          </li>
          <li className='hover:bg-background-hover p-2' onClick={handleUploadPhoto}>
             Upload Photo
          </li>
          <li className='hover:bg-background-hover p-2' onClick={handleRemovePhoto}>
            Remove Photo
          </li>
        </ul>
        </div>
        )
       }
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%]
                          translate-y-[-50%] flex flex-col items-center p-2'>
          {photoOpen ? (<>

            <img src={photo}/>
          
          </>):(webCamOpen && <>
              <Webcam height={600} width={600} ref={webCamRef}></Webcam>
              <div className='relative w-[3rem] h-[3rem] rounded-full border-white border-2
                         bg-background-hover  mt-[2rem] cursor-pointer text-center hover:bg-white
                         '
                         onClick={handleScreenshot}>
                  <div className='absolute top-[50%] left-[50%] translate-x-[-50%]
                        translate-y-[-50%] w-[2rem] h-[2rem] rounded-full border-white border-2
                        hover:border-neutral-button hover:border-8 hover:bg-neutral-button'>
                          
                  </div>
              </div>
              </>
            )
          }

          <div className='flex justify-center mt-2'>
            {photoOpen && (
              <>
            <button className='bg-neutral-button text-white border-white p-2 rounded-md mr-2'
              onClick ={()=>{setPhotoOpen(false); setWebCamOpen(true)}}>
                Retake
            </button>
            <button className='bg-success-button text-white border-white p-2 rounded-md'
              onClick={handlePhotoConfirm}>
                Confirm
            </button>
            </>
            )
            }
          </div>

        </div>
       
    </div>
  )
}
