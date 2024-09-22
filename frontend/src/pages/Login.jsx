import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch =useDispatch();
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()


  useEffect(() => {
    if(token && token?.success == 1 && token?.message) {
      toast.success(token?.message)
      localStorage.setItem("token",JSON.stringify(token.details.token));

      setTimeout(() => {
        navigate("/")
      }, 2000);

    }else{
      toast.error(token?.message)
    }

  },[token])
  return (
    <>
<div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
  <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
    <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
      Welcome to Chatty app
    </h1>
    <form className="space-y-6" onSubmit={handleSubmit((data) => {
      // console.log(data)
        dispatch(loginUser(data))
    })}>
      <div>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-400"
          id="email"
          type="email"
          {...register("email",{required:"Enter your email"})}
        />

        
           {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        
      </div>
      <div>
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-400"
          id="password"
          name="password"
          type="password"
          {...register("password",{required:"Enter your password"})}
        />
            {errors.password && <p className="text-red-700">{errors.password.message}</p>}
      </div>
      <div>
        <button type="submit" className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
          Log In
        </button>
      </div>
      <div>
       <Link to="/signup"> <p>Dont't have an account ? Register here.. </p></Link>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default Login;
