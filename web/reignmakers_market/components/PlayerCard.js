import TransactionsCard from "./TransactionsCard";
import {useState} from "react";


export default function PlayerCard(props) {

  const [showModal, setShowModal] = useState(false);

  let borderClass
  switch (props.tier) {
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

  const openTransactionModal = () => {
    return (
      setShowModal(true)
    )
  }

  return (
    <div className={`border-4 ${borderClass} text-center flex flex-col`} key={props.key}>
      <h1>{props.name}</h1>
      <p className="">{props.position}</p>
      <p className="mb-1">{props.floor}</p>
      <button type="button"
      className="mt-auto inline-flex mx-auto items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={openTransactionModal}>
        sales
      </button>
      {showModal &&
        <TransactionsCard borderClass={borderClass} merchandiseKey={props.merchandiseKey} name={props.name} rarity={props.tier}/>
      }
    </div>
  )
}
