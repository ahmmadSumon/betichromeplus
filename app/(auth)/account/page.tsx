'use client'

import React, { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import './style.css'
import { SignupFormDemo } from '@/components/SignupFormDemo'
import { LoginFormDemo } from '@/components/LoginFormDemo'

function AccountContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const fromCheckout = searchParams.get('from') === 'checkout'

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
      {fromCheckout && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-md w-full mx-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Quick Checkout Option</h3>
            <p className="text-gray-600 text-sm mb-4">Don't want to create an account? No problem!</p>
            <button
              onClick={handleGuestCheckout}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition"
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
