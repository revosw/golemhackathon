import { useState } from 'react'
import Link from 'next/link'

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement user search logic
    console.log('Searching for:', searchTerm)
    // Mock search results
    setSearchResults(['user1', 'user2', 'user3'])
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Search Users</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
          Search
        </button>
      </form>
      <div>
        {searchResults.map((user) => (
          <div key={user} className="mb-2">
            <Link href={`/${user}`} className="text-blue-500 hover:underline">
              @{user}
            </Link>
            <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm hover:bg-blue-600">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}