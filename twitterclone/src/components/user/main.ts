import { getSelfMetadata } from "golem:api/host@0.2.0";
import {UserApi as UserApiType} from "./generated/user.js"
import { PostApi } from "golem:post-stub/stub-post"
import * as cfg from "../../lib/cfg.js"
import { UserApi } from "golem:user-stub/stub-user";

let username = "";
const followers: string[] = [];
const following: string[] = [];
const posts: string[] = [];

export const userApi: UserApiType = {
    follow(userid: string) {
        // Add the other user to my list of following users
        following.push(userid);

        // Add myself as a follower to the other user to make the
        // "who is following me" query much more scalable
        const workerName = getSelfMetadata().workerId.workerName;
        const otherUser = new UserApi(cfg.getUserWorkerURN(workerName))
        otherUser.blockingAddFollower(workerName)
    },
    addFollower(userid: string) {
        followers.push(userid)
    },
    getTimeline(userid: string) {
        const workerName = getSelfMetadata().workerId.workerName;
        const postWorkerURN = cfg.getPostWorkerURN(workerName);
        const componentTwo = new PostApi(postWorkerURN);
        componentTwo.blockingGetPost();

        return []
    },
}
