export interface UserproxyApi {
  addFollower(followee: string, follower: string): void,
}

export interface UserproxyWorld {
  userproxyApi: UserproxyApi,
}
