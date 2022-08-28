import TransactionsCard from "./TransactionsCard";
import {useState} from "react";


export default function PlayerCard(props) {

  const [showModal, setShowModal] = useState(false);

  let borderClass
  let buttonClass
  let chartColors
  switch (props.item.rarity) {
    case "Rare": {
      borderClass = "border-green-500"
      buttonClass = {
        buttonBg: "bg-green-500",
        buttonHover: "hover:bg-green-600",
        buttonFocus: "focus:ring-green-400"
      }
      chartColors = {
        background: "#43a047",
        border: "#388e3c",
      }
      break;
    }
    case "Elite": {
      borderClass = "border-blue-500"
      buttonClass = {
        buttonBg: "bg-blue-500",
        buttonHover: "hover:bg-blue-600",
        buttonFocus: "focus:ring-blue-400"
      }
      chartColors = {
        background: "#1e88e5",
        border: "#1976d2",
      }
      break;
    }
    case "Legendary": {
      borderClass = "border-yellow-500"
      buttonClass = {
        buttonBg: "bg-yellow-500",
        buttonHover: "hover:bg-yellow-600",
        buttonFocus: "focus:ring-yellow-400"
      }
      chartColors = {
        background: "#fdd835",
        border: "#fbc02d",
      }
      break;
    }
    case "Reignmaker": {
      borderClass = "border-red-500"
      buttonClass = {
        buttonBg: "bg-red-500",
        buttonHover: "hover:bg-red-600",
        buttonFocus: "focus:ring-red-400"
      }
      chartColors = {
        background: "#e53935",
        border: "#d32f2f",
      }
      break;
    }
    default: {
      borderClass = "border-gray-200"
      buttonClass = {
        buttonBg: "bg-gray-800",
        buttonHover: "hover:bg-gray-900",
        buttonFocus: "focus:ring-gray-700"
      }
      chartColors = {
        background: "#424242",
        border: "#212121",
      }
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
                className={`mt-auto inline-flex mx-3 items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${buttonClass.buttonBg} ${buttonClass.buttonHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass.buttonFocus}`}
                onClick={() => setShowModal(true)}>
          sales
        </button>
        <button type="button"
        className={`mt-auto inline-flex mx-3 items-center my-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${buttonClass.buttonBg} ${buttonClass.buttonHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass.buttonFocus}`}
        >
          <a target="none" href={`https://marketplace.draftkings.com/listings/collectibles/${props.item.merchandiseKey}`}>store</a>
        </button>
      </div>
      {showModal &&
        <TransactionsCard chartColors={chartColors} buttonClass={buttonClass} removeModal={toggleTransactionModal} borderClass={borderClass} merchandiseKey={props.item.merchandiseKey} name={props.item.name} set={props.item.set}/>
      }
    </div>
  )
}
