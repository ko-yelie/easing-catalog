import Link from 'next/link'
import HelloWorld from '../components/hello-world'

export default function Home() {
  return (
    <div className="app">
      <HelloWorld />
      <nav>
        <ul>
          <li>
            <Link href="/rectangle/">Rectangle</Link>
          </li>
          <li>
            <Link href="/text/">Text</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
