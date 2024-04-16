import React from 'react'

type Props = {}

const Skeleton = (props: Props) => {
  return (
    <div className='mt-10 dark'>
        <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-[40%]"></h3>

        <ul className="mt-5 space-y-3">
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        </ul>
    </div>
  )
}

export default Skeleton