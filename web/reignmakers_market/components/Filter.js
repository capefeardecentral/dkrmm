export default function Filter(props) {

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
     { props.options.map(option => (
         <button
           type="button"
           className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
           onClick={() => props.handler(props.criteria, option)}
         >
           {option}
         </button>))}
    </span>
  )
}
