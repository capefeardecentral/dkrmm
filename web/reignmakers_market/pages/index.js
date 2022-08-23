import Head from 'next/head'
import { useState, useEffect } from 'react'
import Filter from '../components/Filter';
import PlayerCard from "../components/PlayerCard";

const Home = () => {

  const [market, setMarket] = useState('')
  const [rankings, setRankings] = useState('')
  const [marketView, setMarketView] = useState('')
  const [currentPosition, setCurrentPosition] = useState('')
  const [currentRarity, setCurrentRarity] = useState('')

  const rarities = ["Core", "Rare", "Elite", "Legendary", "Reignmaker"]
  const positions = ["QB", "RB", "WR", "TE"]
  const tiers = ["Skill Starters", "Role Players", "QB1", "Rookies - Offense"]

  const filterMarketView = (criteria, target) => {
    if (currentRarity) {
      let newView = market.filter(player => player[criteria] === target && player.rarity === currentRarity)
      setMarketView(newView)
      setCurrentPosition(target)
      return
    }
    let newView = market.filter(player => player[criteria] === target)
    setMarketView(newView)
    setCurrentPosition(target)
    setCurrentRarity("")
  }

  const filterMarketViewRarity = (criteria, target) => {
    if (currentRarity) {
      if (currentPosition) {
        let targetKey = positions.includes(currentPosition) ? "position" : "tier"
        let newView = market.filter(player => player.rarity === target && player[targetKey] === currentPosition)
        setMarketView(newView)
        setCurrentRarity(target)
        return
      }
      let newView = market.filter(player => player.rarity === target)
      setMarketView(newView)
      setCurrentRarity(target)
      return
    }
    let newView = marketView.filter(player => player.rarity === target)
    setMarketView(newView)
    setCurrentRarity(target)
  }

  const resetFilters = (criteria, target) => {
    setMarketView(market)
    setCurrentPosition('')
    setCurrentRarity('')
  }

  useEffect(() => {
    fetch('https://api.dkrmm.cfd/api/marketplace')
    .then(res => res.json()).then(data => {
      setMarket(data)
      setMarketView(data)
    }).catch(err => {
      console.log(err)
    })
    fetch('https://api.dkrmm.cfd/api/rankings')
      .then(res => res.json()).then(data => {
      setRankings(data)
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
        <Filter options={positions} criteria="position" handler={filterMarketView} />
        <Filter options={tiers} criteria="tier" handler={filterMarketView} />
        <div>
          <Filter options={rarities} criteria="tiers" handler={filterMarketViewRarity} />
        </div>
        <div>
          <Filter options={["reset filters"]} criteria="" handler={resetFilters} />
        </div>
        <div className="grid my-5 grid-cols-3 gap-1 md:grid-cols-4 md:gap-4 place-content-center w-full">
          {marketView && marketView.map(item => (
            <PlayerCard
              item={item}
              ranking={rankings[item.dkPlayerNumber]}
            />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Home
