"use client"

import './globals.css';
import { Provider } from 'react-redux'; 
import {store} from '@/store/store'
import {Toaster} from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Provider store={store}>{children}</Provider>
      <input type="file" id="photo-picker" className='hidden'/>
      <Toaster />
      </body>
    </html>
  )
}
