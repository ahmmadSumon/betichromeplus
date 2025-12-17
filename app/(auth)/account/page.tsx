'use client'

import React, { useEffect } from 'react'
import './style.css'
import { SignupFormDemo } from '@/components/SignupFormDemo'
import { LoginFormDemo } from '@/components/LoginFormDemo'

const Page = () => {
  useEffect(() => {
    const container = document.querySelector('.auth-container')
    const registerBtn = document.querySelector('.register-btn')
    const loginBtn = document.querySelector('.login-btn')

    // safety check
    if (!container) return

    const handleRegister = () => {
      container.classList.add('active')
    }

    const handleLogin = () => {
      container.classList.remove('active')
    }

    registerBtn?.addEventListener('click', handleRegister)
    loginBtn?.addEventListener('click', handleLogin)

    return () => {
      registerBtn?.removeEventListener('click', handleRegister)
      loginBtn?.removeEventListener('click', handleLogin)
    }
  }, [])

  return (
    <div className="yy min-h-screen pt-28 w-full flex items-center justify-center mt-28 md:mt-10">
      <div className="auth-container">
        <div className="form-box login">
          <LoginFormDemo />
        </div>

        <div className="form-box register">
          <SignupFormDemo />
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1 className="text-4xl font-bold">Hello! Welcome</h1>
            <p className="text-lg">Don't Have an Account?</p>
            <button className="btn cursor-pointer register-btn bg-amber-700">
              REGISTER
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <p className="text-lg">Already have an account?</p>
            <button className="btn cursor-pointer login-btn bg-amber-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
