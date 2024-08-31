import { PostApi } from './generated/post.js';

let username = ""
let content = ""
const posted = new Date()
let likes = 0

export const postApi: PostApi = {
    newPost(_username, _content) {
        username = _username
        content = _content
    },
    getPost() {
        return {
            username,
            content,
            posted: posted.toISOString(),
            likes
        };
    }
}