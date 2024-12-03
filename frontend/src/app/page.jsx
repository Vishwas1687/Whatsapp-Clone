"use client"
import { store } from '../store/store'
import { Provider } from 'react-redux'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {BASE_URL} from '../utils/base_url'
import {useRouter} from 'next/navigation'
import {updateUsername, updateAvatar} from '../store/slices/userSlice'
import {useSelector, useDispatch} from 'react-redux'
const StartPage = ()=> {
  const dispatch = useDispatch()
  const router = useRouter()
  const User = useSelector((state)=>state.user)
  console.log(User)
  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (User.username.length) {
        router.push('/chat');
      } else {
        if (token) {
          try {
            const response = await axios.get(`${BASE_URL}/user/getUser`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            const user = response.data;
            if (user.username?.length) {
              dispatch(updateUsername(user.username));
            }
            if (user.avatar?.length) {
              dispatch(updateAvatar(user.avatar));
            }
            router.push('/chat');
          } catch (error) {
            console.error('Error fetching user:', error);
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      }
    };
  
    fetchData();
  }, []);
    return (<>

    </>)
}

export default StartPage