import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import PlayerCard from "../components/PlayerCard";


const Portfolio = () => {

  const [portfolioInput, setPortfolioInput] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [portfolioValues, setPortfolioValues] = useState()

  useEffect(() => {
    if (portfolio.length > 1) {
      fetch(`https://dkrmm.cfd/api/portfolio/${portfolio}`)
        .then(res => res.json()).then(data => {
        setPortfolioValues(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [portfolio])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPortfolio(portfolioInput)
  }

  return(
    <div className="min-h-screen flex-col  py-2">
      <Head>
        <title>DKRMM - Portfolio Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="p-5 md:mx-20">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Check your portfolio value</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>go to <a className="font-bold text-green-600" href="https://marketplace.draftkings.com/portfolio/" target="none">your draftkings portfolio</a> to get your user key and enter it below</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="email" className="sr-only">
                  portfolio key
                </label>
                <input
                  type="text"
                  name="portfolio"
                  id="portfolio"
                  value={portfolioInput}
                  onChange={(e) => {setPortfolioInput(e.target.value)}}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-sm"
                  placeholder="7dfa6311-9a82-427d-9139-153410e9594e"
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        {portfolioValues &&
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Portfolio Value</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Floor Value</dt>
                <dd className="mt-1 text-3xl tracking-tight font-semibold text-gray-900">{Math.round(portfolioValues.value.floorValue)}</dd>
                <dt className="mt-2 text-sm font-medium text-gray-500 truncate">Total Cards Tracked</dt>
                <dd className="mt-1 text-3xl tracking-tight font-semibold text-gray-900">{portfolioValues.value.cardsTracked}</dd>
              </div>
            </dl>
            <p className="mt-3 font-extralight">NOTE: Collection floor value is extremely inaccurate, it only shows your value at the current lowest listing prices.
              Presently only Rookies, Skill Starters, and QB1s are tracked.</p>
          </div>
        }
        <div className="grid my-5 grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 place-content-center w-full">
          {portfolioValues &&

            portfolioValues.holdings.map(item => (
            <PlayerCard
              item={item}
              ranking={""}
            />
          ))}
        </div>
      </main>
    </div>
      )
}

export default Portfolio
