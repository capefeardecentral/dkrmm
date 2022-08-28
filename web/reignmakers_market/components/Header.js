export default function Header (props) {
  return (
    <header className="flex shadow-lg items-center align-middle border-b-green-500 border-b-2 text-gray-700 mb-5 py-10">
      <a href="/">
        <h1 className="px-5 md:text-3xl font-light">DKRMM.CFD</h1>
      </a>
      <div className="absolute text-xs md:text-lg right-0 font-bold mx-5 uppercase">
        <a href="/portfolio">portfolio tracker</a>
      </div>
    </header>
  )
}