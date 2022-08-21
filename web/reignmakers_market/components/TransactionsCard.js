import {useEffect, useState, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

export default function TransactionsCard(props) {

  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = useState(true)

  useEffect(() => {
    fetch(`https://api.dkrmm.cfd/api/transactions/${props.merchandiseKey}`)
    .then(res => res.json()).then(data => {
      setTransactions(data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const formatDate = (date) => {
    let newDate = new Date(date)
    return newDate.toLocaleString()
  }

  return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {props.name}
                      </Dialog.Title>
                      <h1>{props.rarity}</h1>
                      <div className="mt-2">
                        {transactions.map(transaction => (
                          <div className={`${props.borderClass} border-2`} key={transaction.id}>
                            <p className="py-2">{formatDate(transaction.transactionDate)}</p>
                            <p className="py-2">{transaction.amount}</p>
                          </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )
}