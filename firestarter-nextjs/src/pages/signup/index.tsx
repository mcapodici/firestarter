import SignupForm from '@/components/SignupForm'
import Layout from '@/components/Layout'
import { useContext, useState } from 'react';
import { Context } from '@/context/Context';

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
          <SignupForm onSignupClick={async (email, password) => {
            const signupResult = await backend.signup(email, password);
            return signupResult;
          }} />
        </div>
      </Layout>
    </>
  )
}
