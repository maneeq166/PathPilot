import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">PathPilot</div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
          <Link to="/auth/register" className="hover:text-gray-500 transition-colors">Register</Link>
          <Link to="/auth/login" className="hover:text-gray-500 transition-colors">Login</Link>
        </div>
      </nav>
    </header>
  )
}
