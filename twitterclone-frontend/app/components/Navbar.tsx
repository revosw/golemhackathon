import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Twitter Clone
        </Link>
        <div>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/register" className="text-white">
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}
