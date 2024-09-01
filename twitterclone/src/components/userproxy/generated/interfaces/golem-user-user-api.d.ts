declare module "golem:user/user-api" {
  /**
   * record post {
     * userid: string,
     * username: string,
     * content: string,
     * posted: string,
     * likes: u32,
     * }
   */
  export interface User {
    userid: string,
    username: string,
    image?: string,
    following: string[],
  }
  export function login(username: string): User;
  export function follow(userid: string): void;
  export function addFollower(userid: string): void;
  export function getTimeline(userid: string): string[];
}
