import { Tweet } from '@/components/Tweet'
import { getUserTweets } from '@/lib/api'

export default function UserProfile({ params }: { params: { username: string } }) {
  const tweets = getUserTweets(params.username)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">@{params.username}'s Profile</h1>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}