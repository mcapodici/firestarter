import SignupForm from '@/components/SignupForm'
import Layout from '@/components/Layout'

export default function Signup() {
  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="title mb-12">Reap the benefits</h1>
          <h3 className="text-3xl font-bold mb-8">Sign up for free now!</h3>
        </div>
        <div className="m-auto max-w-md">
          <SignupForm />
        </div>
      </Layout>
    </>
  )
}
