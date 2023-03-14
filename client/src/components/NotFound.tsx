import React from 'react'
import NotFoundSvg from '../assets/NotFound.svg'

type Props = {}

const NotFound = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <img src={NotFoundSvg} alt="not-found" className="h-48 w-48 text-gray-400 mb-8" />
      <h1 className="text-4xl font-bold text-gray-700 mb-4">404 - Page Not Found</h1>

      <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for could not be found.</p>
    </div>
  )
}

export default NotFound