import siteMetadata from '/data/siteMetadata'
import Logo from '/data/image/logo.svg'
import Link from './Link'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import {useSession} from 'next-auth/react'
import {headerNavLinks, sessionHeaderNavLink , signInHeaderNavLink} from '/data/headerNavLinks'


const Layout = ({children}) => {
    const {data: session} = useSession()

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="flex h-screen flex-col justify-between font-vazir">
                <header className="flex items-center justify-between py-10">
                    <div>
                        <Link href="/" aria-label={siteMetadata.headerTitle}>
                            <div className="flex items-center justify-between">
                                <div className="mr-3">
                                    <Logo/>
                                </div>
                                {typeof siteMetadata.headerTitle === 'string' ? (
                                    <div className="hidden h-6 text-2xl font-semibold sm:block">
                                        {siteMetadata.headerTitle}
                                    </div>
                                ) : (
                                    siteMetadata.headerTitle
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center text-base leading-5">
                        <ul className="hidden sm:block">
                            {headerNavLinks.map((link, index) => (
                                <li className='inline-block' key={index}>
                                    <Link
                                        href={link.href}
                                        className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                            {session ? (
                                <>
                                    {sessionHeaderNavLink.map((link, index) => (
                                        <li className='inline-block' key={index}>
                                            <Link
                                                href={link.href}
                                                className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            ) : (
                                <li className='inline-block'>
                                    <Link
                                        href={signInHeaderNavLink.href}
                                        className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                                    >
                                        {signInHeaderNavLink.title}
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <ThemeSwitch/>
                        <MobileNav/>
                    </div>
                </header>
                <main className="mb-auto">{children}</main>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout
