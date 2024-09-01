import { getSelfMetadata,  } from "golem:api/host@0.2.0";
import { WasmRpc } from "golem:rpc/types@0.1.0";
import {UserApi as UserApiType} from "./generated/user.js"
import { PostApi } from "golem:post-stub/stub-post"
import * as cfg from "../../lib/cfg.js"
import { UserproxyApi } from "golem:userproxy-stub/stub-userproxy"
import { randomUUID } from "crypto";

let username = "";
const followers: string[] = [];
const following: string[] = [];
const posts: string[] = [];

export const userApi: UserApiType = {
    login(_username: string) {
        const workerName = getSelfMetadata().workerId.workerName;
        return {
            following: [],
            userid: "",
            username: "",
            image: ""
        }
    },
    follow(userid: string) {
        // Add the other user to my list of following users
        following.push(userid);

        // Add myself as a follower to the other user to make the
        // "who is following me" query much more scalable
        const myselfId = getSelfMetadata().workerId.workerName;
        const proxy = new UserproxyApi(cfg.getUserproxyWorkerURN())
        proxy.blockingAddFollower(userid, myselfId)
    },
    addFollower(userid: string) {
        followers.push(userid)
    },
    getTimeline(userid: string) {
        const workerName = getSelfMetadata().workerId.workerName;
        const postWorkerURN = cfg.getPostWorkerURN(workerName);
        // const componentTwo = new PostApi(postWorkerURN);
        // componentTwo.blockingGetPost();

        return []
    },
    newPost() {
        const postId = randomUUID()
        new WasmRpc({})
        const newPost = new PostApi({ value: postId })
    }
}
