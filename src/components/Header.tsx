import { Link } from '@tanstack/react-router'
import { FloatingNav } from './ui/floating-navbar'

export default function Header() {

  const navitem = [
    {name: "Login", link: "/auth/login"  },
    {name:"Register",link:"/auth/register"},
    

  ]

  return (
    <FloatingNav navItems={navitem} ></FloatingNav>
  )
}
