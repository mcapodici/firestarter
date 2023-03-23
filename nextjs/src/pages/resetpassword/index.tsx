import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import Link from 'next/link'

export default function ResetPassword() {

  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="title mb-12">Reset Password</h1>
        </div>
        <div className="m-auto max-w-md">
          <ResetPasswordForm />
        </div>
      </Layout>
    </>
  )
}
