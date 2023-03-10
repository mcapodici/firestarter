import HeroSectionWithImage from "@/components/HeroSectionWithImage";
import Layout from "@/components/Layout";
import { Alert } from "@/components/Alert";

export default function Home() {
  return (
    <>
      <div className="text-center">
        <Alert level="success">
          This is a demo site for 🔥 Firestarter! A starter kit for web apps.
          You can see the source on{" "}
          <a className="anchor" href="https://github.com/mcapodici/firestarter">
            Github 🐙
          </a>
        </Alert>
      </div>
      <Layout>
        <HeroSectionWithImage
          imgsrc="/landingpage1.jpg"
          heading={
            <>
              The best offer <br />
              <span className="text-blue-600">for your business</span>
            </>
          }
        ></HeroSectionWithImage>
      </Layout>
    </>
  );
}
