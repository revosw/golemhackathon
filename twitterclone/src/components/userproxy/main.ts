import { getSelfMetadata } from "golem:api/host@0.2.0";
import {UserproxyApi} from "./generated/userproxy.js"
// import { PostApi } from "golem:post-stub/stub-post"
import * as cfg from "../../lib/cfg.js"
// import { UserApi } from "golem:user-stub/stub-user";

let username = "";
const followers: string[] = [];
const following: string[] = [];
const posts: string[] = [];

export const userproxyApi: UserproxyApi = {
    
    addFollower(userid: string) {
        // followers.push(userid)
    },
}
