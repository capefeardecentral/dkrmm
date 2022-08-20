export default function PlayerCard(props) {

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

  return (
    <div className={`border-4 ${borderClass} text-center`} key={props.key}>
      <h1>{props.name}</h1>
      <p className="">{props.position}</p>
      <p className="">{props.floor}</p>
    </div>
  )
}
