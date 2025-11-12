import React, { useState } from 'react'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { Button } from '@mui/material';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className="max-w-md h-[85vh] rounded-md shadow-lg">
        <img src="#" alt="#" className="w-full rounded-t-md" />

        <div className="mt-8 px-10">
          {/* Toggle between Login and Register */}
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Button */}
          <div className="flex items-center gap-1 justify-center mt-5">
            <p>{isLogin && "Don't"} have Account</p>
            <Button size="small" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create Account" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth