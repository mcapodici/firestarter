import HeroSectionWithImage from '@/components/HeroSectionWithImage'
import Layout from '@/components/Layout'

export default function Home() {

  return (
    <>
      <Layout>
        <HeroSectionWithImage
          imgsrc="/landingpage1.jpg"
          heading={
            <>The best offer <br /><span className="text-blue-600">for your business</span></>
          }></HeroSectionWithImage>
      </Layout>
    </>
  )
}
