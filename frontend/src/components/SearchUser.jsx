import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { searchQuery } from "../features/chat/chatSlice";


const SearchUser = () => {
    const [input,setInput] = useState('');
    const dispatch = useDispatch()
  return (
    <>
      <div className="flex flex-col gap-4 justify-center w-[100%]">
        <div className="search-input">
          <input type="text" placeholder="Search here..."  className="outline-none border-none" onChange={(e) => {
            let value = e.target.value
            dispatch(searchQuery(value))
          }} />
        </div>
        <div className="search-result"></div>
      </div>
    </>
  );
};
export default SearchUser;
