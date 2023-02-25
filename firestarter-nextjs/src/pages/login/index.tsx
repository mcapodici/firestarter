import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

export default function Login() {

  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="text-5xl font-bold mt-0 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-black">Log in</h1>
          <h3 className="text-3xl font-bold mb-8">Or <Link className='anchor' href="/signup">click here</Link> to sign up</h3>
        </div>
        <div className="m-auto max-w-md">
          <LoginForm />
        </div>
      </Layout>
    </>
  )
}
