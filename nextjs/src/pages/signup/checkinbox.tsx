import SignupForm from '@/components/SignupForm'
import Layout from '@/components/Layout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  return (
    <>
      <Layout>
        <div className="m-auto max-w-3xl mt-20 text-center">
          <div className='flex items-center gap-10'>
          <h1 className="title text-left">Check your inbox, please!</h1>
          <FontAwesomeIcon size='10x' color='indigo' icon={faEnvelope} />
          </div>
          <p className="text-left mt-10">To complete sign up, open the email we have sent you, and click the confirmation link.</p>
        </div>
      </Layout>
    </>
  )
}
