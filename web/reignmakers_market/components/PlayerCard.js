import TransactionsCard from "./TransactionsCard";
import {useState} from "react";


export default function PlayerCard(props) {

  const [showModal, setShowModal] = useState(false);

  let borderClass
  switch (props.item.rarity) {
    case "Rare": {
      borderClass = "border-green-500"
      break;
    }
    case "Elite": {
      borderClass = "border-blue-500"
      break;
    }
    case "Legendary": {
      borderClass = "border-yellow-500"
      break;
    }
    case "Reignmaker": {
      borderClass = "border-red-500"
      break;
    }
    default: {
      borderClass = "border-gray-200"
    }
  }

  const toggleTransactionModal = () => {
    return (
      setShowModal(false)
    )
  }

  return (
    <div className={`py-5 border-4 rounded shadow md:shadow-2xl  shadow-gray-400 ${borderClass} text-center flex flex-col`} key={props.key}>
      <h1 className="text-sm font-bold md:text-lg">{props.item.name}</h1>
      <p className="text-sm md:text-lg">{props.item.position}</p>
      <p className="text-sm md:text-lg mb-1">${props.item.floor}</p>
      <p className="text-sm md:text-lg mb-1">{props.item.set}</p>
      <p className="text-sm font-light mb-1">{props.ranking}</p>
      {props.item.superstar === "Yes" && <p className="font-bold text-xs mb-1">superstar</p>}
      <div className="mx-auto">
        <button type="button"
                className="mt-auto inline-flex mx-3 items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowModal(true)}>
          sales
        </button>
        <button type="button"
        className="mt-auto inline-flex mx-3 items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <a target="none" href={`https://marketplace.draftkings.com/listings/collectibles/${props.item.merchandiseKey}`}>store</a>
        </button>
      </div>
      {showModal &&
        <TransactionsCard removeModal={toggleTransactionModal} borderClass={borderClass} merchandiseKey={props.item.merchandiseKey} name={props.item.name} set={props.item.set}/>
      }
    </div>
  )
}
