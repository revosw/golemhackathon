import { useRouter } from 'next/router'
import Timeline from '../components/Timeline'

export default function UserProfile() {
  const router = useRouter()
  const { username } = router.query

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">@{username}'s Profile</h1>
      <Timeline type="user" username={username as string} />
    </div>
  )
}