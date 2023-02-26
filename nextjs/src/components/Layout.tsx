import { Context } from '@/context/Context';
import Head from 'next/head';
import React, { useContext } from 'react';
import Nav from './Nav';
import { Toasts } from './Toasts';

interface Props {
    children: React.ReactNode;
}


export default function Layout(props: Props) {

    const {toasts} = useContext(Context);
    return <>
        <Head>
            <title>Firestarter!</title>
            <meta name="description" content="Firestarter" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
        </Head>
        <main>
            <section className="mb-40">
                <Nav />
                <div className='m-1'>
                <Toasts toasts={toasts} /></div>
                {props.children}
            </section>
        </main>
    </>

}

