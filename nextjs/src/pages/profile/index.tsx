import ProfileForm from '@/components/ProfileForm'
import Layout from '@/components/Layout'

export default function Signup() {
  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="title mb-12">Your Profile</h1>
        </div>
        <div className="m-auto max-w-md">
          <ProfileForm />
        </div>
      </Layout>
    </>
  )
}
