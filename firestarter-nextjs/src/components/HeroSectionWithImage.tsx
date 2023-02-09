import Image from 'next/image'

interface Props {
    imgsrc: string;
    heading: React.ReactNode;
}

// Based on https://tailwind-elements.com/docs/standard/designblocks/hero-sections/

export default function HeroSectionWithImage({ imgsrc, heading }: Props) {
    return <div className="px-6 py-12 md:px-12 bg-gray-50 text-gray-800 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
            <div className="lg:grid-cols-2 gap-12 grid items-center">
                <div className="mt-12 lg:mt-0">
                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                        {heading}
                    </h1>
                    <a className="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</a>
                    <a className="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Learn more</a>
                </div>
                <div className="mb-12 lg:mb-0 rela relative aspect-w-16 aspect-h-16">
                    <Image src={imgsrc} data-testid="hero-image" fill className="w-full rounded-lg shadow-lg object-cover" alt="" /> 
                </div>
            </div>
        </div>
    </div>;
}