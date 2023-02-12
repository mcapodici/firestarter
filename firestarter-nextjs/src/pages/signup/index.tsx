import SignupForm from '@/components/SignupForm'
import Layout from '@/components/Layout'
import { Context } from '@/context/context';
import { useContext, useState } from 'react';

export default function Signup() {
  const { backend } = useContext(Context);
  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="text-5xl font-bold mt-0 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-black">Reap the benefits</h1>
          <h3 className="text-3xl font-bold mb-8">Sign up for free now!</h3>
        </div>
        <div className="m-auto max-w-md">
          <SignupForm onSignupClick={(username, password) => {
            const signupResult = backend.signup(username, password);
            console.log(username, password);
          }} />
        </div>
      </Layout>
    </>
  )
}
