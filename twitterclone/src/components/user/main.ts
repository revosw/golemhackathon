import { user } from './generated/twitterclone.js';
import { postApi } from "golem:post-stub/stub-post";
let username = "";
const followers: string[] = [];
const following: string[] = [];
const posts: string[] = [];

export const user: user = {
    follow(_username: string) {
        following.push(_username);
    },
    following_timeline() {
        const timelinePosts = []
        for (const f of following) {
            timelinePosts.push(post_api.get(f).sort((a, b) => b.posted.getTime() - a.posted.getTime()));
        }
        return timelinePosts;
    }

    user_timeline() {
        const timelinePosts = []
        timelinePosts.push(post_api.get(username).sort((a, b) => b.posted.getTime() - a.posted.getTime()));
        return timelinePosts;
    }


}
