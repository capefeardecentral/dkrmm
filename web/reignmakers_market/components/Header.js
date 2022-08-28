import Link from 'next/link'

export default function Header (props) {
  return (
    <header className="flex shadow-lg items-center align-middle border-b-green-500 border-b-2 text-gray-700 mb-5 py-10">
      <Link href="/">
        <a><h1 className="px-5 md:text-3xl font-light">DKRMM.CFD</h1></a>
      </Link>
      <div className="absolute text-xs md:text-lg right-0 font-bold mx-5 uppercase">
        <Link href="/portfolio">portfolio tracker</Link>
      </div>
    </header>
  )
}