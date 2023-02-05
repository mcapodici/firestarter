import Head from 'next/head';
import React from 'react';
import Nav from './Nav';

interface Props {
    children: React.ReactNode;
}


export default function Layout(props: Props) {
    return <>
        <Head>
            <title>Firestarter!</title>
            <meta name="description" content="Firestarter" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <section className="mb-40">
                <Nav />
                {props.children}
            </section>
        </main>
    </>

}

