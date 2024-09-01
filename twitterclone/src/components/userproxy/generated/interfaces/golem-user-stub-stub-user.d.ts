declare module "golem:user-stub/stub-user" {
  import type { Uri as GolemRpcUri } from "golem:rpc/types@0.1.0";
  import type { Pollable as WasiIoPollable } from "wasi:io/poll@0.2.0";
  import type { User } from "golem:user/user-api";
  export class FutureLoginResult {
    subscribe(): WasiIoPollable;
    get(): User | undefined;
  }
  export class FutureGetTimelineResult {
    subscribe(): WasiIoPollable;
    get(): string[] | undefined;
  }
  export class UserApi {
    constructor(location: GolemRpcUri)
    blockingLogin(username: string): User;
    login(username: string): FutureLoginResult;
    blockingFollow(userid: string): void;
    follow(userid: string): void;
    blockingAddFollower(userid: string): void;
    addFollower(userid: string): void;
    blockingGetTimeline(userid: string): string[];
    getTimeline(userid: string): FutureGetTimelineResult;
  }
}
