import { UserproxyApi } from "./generated/userproxy.js"
import * as cfg from "../../lib/cfg.js"
import { UserApi } from "golem:user-stub/stub-user";

export const userproxyApi: UserproxyApi = {
    
    addFollower(followee: string, follower: string) {
        // The user being followed
        const followeeWorker = new UserApi(cfg.getUserWorkerURN(followee))

        followeeWorker.blockingAddFollower(follower)
    },
}
