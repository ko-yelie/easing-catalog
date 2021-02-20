import Link from 'next/link'
import HelloWorld from '../components/hello-world'

export default function Home() {
  return (
    <div className="app">
      <HelloWorld />
      <Link href="rectangle">rectangle</Link>
    </div>
  )
}
