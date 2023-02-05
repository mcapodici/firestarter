import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Layout>
        <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="grid lg:grid-cols-2 gap-12 flex items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">The best offer <br /><span className="text-blue-600">for your business</span></h1>
                <a className="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</a>
                <a className="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Learn more</a>
              </div>
              <div className="mb-12 lg:mb-0 rela relative w-full h-96">
                <Image src="/landingpage1.jpg" fill className="w-full rounded-lg shadow-lg object-cover" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
