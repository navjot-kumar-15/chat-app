import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [user,setUser] = useState({
    name:"",
    email:"",
    pic:null,
    isAdmin:"",
    password:""
  })
  const [cPassword,setCPassword] = useState("")
  const [matched,setNotMatched] = useState(false)


  return (
    <>
     <>
  {/* source: https://gist.github.com/nraloux/bce10c4148380061781b928cdab9b193 */}
  {/* I have added support for dark mode and improved UI */}
  <div className="h-[100vh] bg-gray-400 dark:bg-gray-900 overflow-hidden">
    {/* Container */}
    <div className="mx-auto pt-[5rem] max-md:pt-[1rem]">
      <div className="flex justify-center px-6 py-[2rem] h-fit max-md:h-[100vh]" >
        {/* Row */} 
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          {/* Col */}
          <div
            className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{
              backgroundImage:
                'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")'
            }}
          />
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
              Create an Account!
            </h3>



            <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded" onSubmit={handleSubmit((data) => {
              if(data.password !== cPassword) {
                alert("Password did not matched")
                return;
              }
              console.log(data);
 
            })}>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0 w-full">
                  <label
                    className="block mb-4 text-sm font-bold text-white"
                    htmlFor="firstName"
                  >
                    Name <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name",{required:"Enter your name"})}
                  />
                   {errors.name && <p className="text-red-900">Hello world</p>}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-white"
                  htmlFor="email"
                >
                  Email <span className='text-red-600'>*</span>
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email",{required:"Enter your email."})}
                />
                 {errors.email && <p className="text-red-900">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-white"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="image"
                  type="file"
                  accept='image/*'
                  {...register("image",{required:"Please select your image"})}
                />
                 {errors.image && <p className="text-red-900">{errors.image.message}</p>}
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-white"
                    htmlFor="password"
                  >
                    Password <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    {...register("password",{required:"Enter your password"})}
                  />
                  { errors.password && <p className="text-red-900">{errors.password.message}</p>}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="c_password"
                  >
                    Confirm Password <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  { matched &&  <p className="text-xs italic">
                    Password did not matched
                  </p>}
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <Link to="/login"
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
 
    </>
  )
}

export default Signup
