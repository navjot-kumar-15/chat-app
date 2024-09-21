import React, { useState } from 'react'
import Header from '../components/Header'
import { Button ,Drawer} from "flowbite-react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
     <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>
 
     <div className='min-h-[95vh] min-w-[100%] border border-red-900 flex gap-2'>
      <div className="left border border-green-500 w-[20%] max-md:hidden p-3">Left div</div>
      <div className="right flex flex-col border border-orange-500 w-[80%] max-md:w-[100%] p-3 relative">
        <div className='min-h-[95%]'>
          messages
        </div>
        <form action="" className='flex gap-3 justify-between bg-red-500 p-2 w-[100%]'>
          <input type="text" placeholder='Enter your message' className="w-[90%] p-1 outline-none border-none" />
          {/* <button className='bg-yellow-500 w-[20%]'>Send</button> */}
          <Button color="blue" className='w-[20%] outline-none border-none' >Blue</Button>  

          
        </form>
      </div>
    </div> 
    </>
  )
}

export default Home
