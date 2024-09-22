import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button} from "flowbite-react";
import SideBar from '../components/SideBar';
import SearchUser from '../components/SearchUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  const {query} = useSelector(state => state.chat);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  if(userInfo && userInfo.success == 0 ) {
    navigate("/login")
  }

  useEffect(() => {
    dispatch(getUserInfo());


  },[])
  return (
    <>
     <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>
 
     <div className='min-h-[95vh] min-w-[100%] border border-red-900 flex gap-2'>
      <div className="left flex flex-col gap-3 border border-green-500 w-[20%] max-md:hidden p-3 overflow-hidden">
        <div className="search w-[100%] flex justify-center cursor-pointer" onClick={() => setIsOpen(true)}>
          <p>Search <i className="ri-search-2-line pl-3"></i></p>
        </div>
          <SideBar
          className="block max-md:hidden"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClose={handleClose} 
          >
            <SearchUser/>
          </SideBar>
        <div className="chats"></div>
      </div>
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
