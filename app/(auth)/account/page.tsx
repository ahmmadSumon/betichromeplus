'use client'

import React, { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import './style.css'
import { SignupFormDemo } from '@/components/SignupFormDemo'
import { LoginFormDemo } from '@/components/LoginFormDemo'

function AccountContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showGuestOption, setShowGuestOption] = React.useState(false)

  React.useEffect(() => {
    setShowGuestOption(searchParams.get('from') === 'checkout')
  }, [searchParams])

  useEffect(() => {
    const container = document.querySelector('.auth-container')
    const registerBtn = document.querySelector('.register-btn')
    const loginBtn = document.querySelector('.login-btn')

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

  const handleGuestCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="yy min-h-screen pt-28 w-full flex items-center justify-center mt-28 md:mt-10">
      {showGuestOption && (
        <div className="fixed top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 md:p-4 w-[90%] max-w-xs md:max-w-md mx-4 md:mx-4">
          <button
            onClick={() => setShowGuestOption(false)}
            className="absolute top-1 md:top-2 right-2 text-gray-400 hover:text-gray-600 text-lg md:text-xl font-bold w-6 h-6 flex items-center justify-center"
          >
            ×
          </button>
          <div className="text-center pt-2">
            <h3 className="text-base md:text-lg font-semibold mb-2">Quick Checkout Option</h3>
            <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">Don't want to create an account? No problem!</p>
            <button
              onClick={handleGuestCheckout}
              className="w-full bg-green-600 text-white py-2 px-3 md:px-4 rounded-lg text-sm md:text-base font-medium hover:bg-green-700 transition"
            >
              Continue as Guest
            </button>
            <p className="text-xs text-gray-500 mt-2">Or login/register below for faster future orders</p>
          </div>
        </div>
      )}
      
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

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AccountContent />
    </Suspense>
  )
}

export default Page
