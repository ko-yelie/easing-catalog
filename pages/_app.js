import Link from 'next/link'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import '../styles.scss'

gsap.registerPlugin(CustomEase)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <Link href="/">Top</Link>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
