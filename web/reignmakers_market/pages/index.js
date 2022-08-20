import Head from 'next/head'
import { useState, useEffect } from 'react'
import Filter from '../components/Filter';
import PlayerCard from "../components/PlayerCard";

const Home = () => {

  const [market, setMarket] = useState('')
  const [marketView, setMarketView] = useState('')

  const rarities = ["Core", "Rare", "Elite", "Legendary", "Reignmaker"]
  const positions = ["QB", "RB", "WR", "TE"]

  const filterMarketView = (criteria, target) => {
    let newView = market.filter(player => player[criteria] === target)
    setMarketView(newView)
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/marketplace')
    .then(res => res.json()).then(data => {
      setMarket(data)
      setMarketView(data)
    }).catch(err => {
      console.log(err)
    })
  }, [])


  return (
    <div className="min-h-screen flex-col  py-2">
      <Head>
        <title>DKRMM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1 className="py-5 px-5 text-3xl font-light">DKRMM.CFD</h1>
      </header>

      <main className="p-5">
        <Filter options={rarities} criteria="rarity" handler={filterMarketView} />
        <Filter options={positions} criteria="position" handler={filterMarketView} />
        <div className="grid grid-cols-4 gap-4 place-content-center w-full">
          {marketView && marketView.map(item => (
            <PlayerCard tier={item.rarity} position={item.position} key={item.id} name={item.name} floor={item.floor} />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Home
