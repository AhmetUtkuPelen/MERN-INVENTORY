import { Link } from "react-router-dom"
import MernStack from "../../Assets/mern.png"
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";



const Footer = () => {

  const date = new Date()

  const getCurrectYear = date.getFullYear()

  const [isHovered,setIsHovered] = useState()

  return (
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-2/5 max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col items-center sm:flex sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="flex justify-center items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={MernStack} className="min-w-[100px] w-80"/>
            </Link>
            <ul className="flex justify-center items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 space-x-4">
                <li>
                    <Link to="https://github.com/AhmetUtkuPelen" target="_blank" className="me-4 md:me-6"><FaGithub size={25} color="blue"/></Link>
                </li>
                <li>
                    <Link to="https://www.instagram.com/rngd_aup/" target="_blank" className="me-4 md:me-6"><FaInstagram size={25} color="blue"/></Link>
                </li>
                <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link className="me-4 md:me-6">
                <MdAlternateEmail size={25} color="blue" />
              </Link>
              {isHovered && (
                <div className="absolute p-4 mt-3 rounded shadow-md text-sm bg-blue-700">
                  <p className="text-white">ahmetutkupelen@gmail.com</p>
                </div>
              )}
            </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-2xl text-blue-600 sm:text-center items-center"><span className="text-red-600">©</span> {getCurrectYear} <Link href="/" className="hover:underline text-2xl text-blue-600">AUP ™</Link><span className="text-red-600"> ©</span></span>
    </div>
</footer>

  )
}

export default Footer