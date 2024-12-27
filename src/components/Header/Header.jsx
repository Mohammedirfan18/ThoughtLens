import React, { useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { Logo, LogoutBtn } from "../index"
import { useSelector } from 'react-redux'
import { Container } from "../index"
import { FaCircleUser } from "react-icons/fa6";
import { RiMenuFill } from "react-icons/ri";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';




function Header() {
  const authStatus = useSelector((state) => state.status)
  const navigate = useNavigate()
  const userData = useSelector(state => state.userData)
  const userName = userData ? ((userData.name).indexOf(' ') >= 0 ? (userData.name).slice(0, (userData.name).indexOf(' ')) : userData.name) : null

  const [toggled, setToggled] = useState(false);
  // const toggled = true;

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='w-screen py-2 shadow-lg bg-white px-5 sm:px-10 fixed top-0 z-[999]'>
      <nav className='flex items-center justify-between '>

        <div className='sm:hidden'>
          <RiMenuFill onClick={() => setToggled(!toggled)} />
        </div>

        {/* Menu bar for mobile device */}
        <Sidebar backgroundColor="#fff" onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="all">
          <Menu>
            <MenuItem>
              <div className='flex gap-2' onClick={() => setToggled(false)}>
                <FaCircleUser className='text-violet-600 w-7 h-7' />
                <h3 className='text-violet-600 font-bold'>{userName}</h3>
              </div>
            </MenuItem>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <MenuItem>
                    <Link to={item.slug} onClick={() => setToggled(false)} className='hover:text-violet-700 hover:font-bold transition-all duration-100'>{item.name}</Link>
                  </MenuItem>
                </li>
              ) : null
            ))}
            <MenuItem onClick={() => setToggled(false)}><LogoutBtn style="bg-white text-black font-normal px-0 py-0 mb-3 hover:text-violet-700 hover:font-bold transition-all duration-100"/></MenuItem>
            <MenuItem>
              <Link to='/' onClick={() => setToggled(false)}>
                <Logo width='100px' />
              </Link>
            </MenuItem>
          </Menu>
        </Sidebar>
        


             {/*Large screen  */}

        <div className='mr-4 hidden sm:block'>
          <Link to='/'>
            <Logo width='100px' />
          </Link>
        </div>

        <ul className='hidden sm:flex '>
          {navItems.map((item) => (
            item.active ? (
              <li key={item.name}>
                <NavLink to={item.slug} className={({ isActive }) => (isActive ? "inline-block px-4 py-3 -mt-1 text-violet-500 font-bold border-b-2 border-violet-700 " : "inline-block px-5 py-2 text-violet-500 font-bold")}>
                  {item.name}
                </NavLink>
              </li>
            ) : null
          ))}
        </ul>

        {authStatus && (
          <div className='hidden sm:flex items-center gap-5'>
            <div className='flex gap-2'>
              <FaCircleUser className='text-violet-600 w-7 h-7' />
              <h3 className='text-violet-600 font-bold'>{userName}</h3>
            </div>
            <div>
              <LogoutBtn />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header