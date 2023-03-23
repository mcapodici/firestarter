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
                    <h1 className="title mb-12">
                        {heading}
                    </h1>
                    <a className="inline-block button blue big" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</a>
                    <a className="inline-block button flatwhite big" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Learn more</a>
                </div>
                <div className="mb-12 lg:mb-0 rela relative aspect-w-16 aspect-h-16">
                    <Image src={imgsrc} data-testid="hero-image" fill className="w-full rounded-lg shadow-lg object-cover" alt="" /> 
                </div>
            </div>
        </div>
    </div>;
}