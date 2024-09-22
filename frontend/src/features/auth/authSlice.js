import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"



const initialState = {
  user:null,
  isLoading:false,
  isError:false,
  token:null,
  message:""
}
const URL = "http://localhost:8080"
export const registerUser = createAsyncThunk("auth/registerUser",async(value) => {
    try {
        const {data} = await axios.post(`${URL}/api/user/register`,value);
        // console.log(data)
        
            return data
    } catch (error) {
        console.log(error.message)
    }
})

export const loginUser = createAsyncThunk("auth/loginUser",async(value) => {
    try {
        const {data} = await axios.post(`${URL}/api/user/login`,value);
            return data
    } catch (error) {
        console.log(error.message)
    }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers:(builder => {
    // Register user start 
    builder.addCase(registerUser.pending,(state,action) => {
        state.isLoading = true
    });
    builder.addCase(registerUser.fulfilled,(state,action) => {
        state.isLoading = false;
        state.message = action.payload
      
    });
    builder.addCase(registerUser.rejected,(state,action) => {
        state.isError = true;
    })
    // Register user end

       // Login user start 
       builder.addCase(loginUser.pending,(state,action) => {
        state.isLoading = true
    });
    builder.addCase(loginUser.fulfilled,(state,action) => {
        state.isLoading = false;
        state.token = action.payload
      
    });
    builder.addCase(loginUser.rejected,(state,action) => {
        state.isError = true;
    })
    // Login user end
  })
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = auth.actions

export default authSlice.reducer