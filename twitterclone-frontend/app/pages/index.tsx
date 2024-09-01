import { useState } from 'react'
import Timeline from '../components/Timeline'
import TweetForm from '../components/TweetForm'
import UserSearch from '../components/UserSearch'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'user' | 'following'>('user')

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Twitter Clone</h1>
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('user')}
        >
          User Timeline
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'following' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('following')}
        >
          Following Timeline
        </button>
      </div>
      <TweetForm />
      <Timeline type={activeTab} />
      <UserSearch />
    </div>
  )
}