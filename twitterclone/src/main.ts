import { Api } from './generated/twitterclone.js';

let state = BigInt(0);

export const api: Api = {
    add(value: bigint) {
        console.log(`Adding ${value} to the counter`);
        state += value;
    },
    get() {
        return state;
    }
}
