import '../styles/globals.css'
import {ThemeProvider} from "next-themes";
import siteMetadata from "../data/siteMetadata";
import Head from "next/head";
import Layout from "@/components/Layout";
import {SessionProvider} from "next-auth/react";

function MyApp({Component, pageProps: { session, ...pageProps }}) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport"/>
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </SessionProvider>)
}

export default MyApp
