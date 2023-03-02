import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import Link from 'next/link'

export default function ResetPassword() {

  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="text-5xl font-bold pb-2 mt-0 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-black">Reset Password</h1>
        </div>
        <div className="m-auto max-w-md">
          <ResetPasswordForm />
        </div>
      </Layout>
    </>
  )
}
