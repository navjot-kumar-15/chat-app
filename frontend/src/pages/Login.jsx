import React from "react";
import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <>
<div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
  <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
    <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
      Welcome to Chatty app
    </h1>
    <form className="space-y-6">
      <div>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-400"
          id="email"
          name="email"
          type="email"
        />
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
        />
      </div>
      <div>
        <button className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
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
