import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query:"",
  isLoading:false,
  isError:false,

}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    searchQuery:(state,action) => {
        state.query = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { searchQuery} = chatSlice.actions

export default chatSlice.reducer