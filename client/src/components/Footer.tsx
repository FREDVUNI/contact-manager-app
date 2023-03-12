import React from 'react'

type Props = {}
const year = new Date().getFullYear()

const Footer = (props: Props) => {
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left mt-9">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
            © {year} Copyright:
            <a className="text-neutral-800 dark:text-neutral-400 ml-3" href="#">contact manager</a>
        </div>
    </footer>
  )
}

export default Footer