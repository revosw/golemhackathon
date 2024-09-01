import {getEnvironment} from "wasi:cli/environment@0.2.0";

let env: Map<string, string> | undefined = undefined;

export const envVarKeys = {
    USER_COMPONENT_ID: "urn:component:c09bde19-80f5-4786-b863-24be77ad7deb",
    POST_COMPONENT_ID: "urn:component:f2859f2f-919e-43b0-b89d-3aa36a3ab172",
    // COMPONENT_THREE_ID: "COMPONENT_THREE_ID",
}

function getEnv(key: string): string | undefined {
    if (env === undefined) {
        env = new Map();
        for (const [key, value] of getEnvironment()) {
            env.set(key, value);
        }
    }

    return env.get(key);
}

function mustGetEnv(key: string): string {
    const value = getEnv(key);
    if (value == undefined) {
        throw new Error(`Expected environment variable is missing: ${key}`)
    }
    return value;
}

export interface Uri {
    value: string,
}

function getComponentWorkerURN(componentID: string, workerName: string): string {
    return `urn:worker:${componentID}/${workerName}`;
}

export function getUserWorkerURN(workerName: string): Uri {
    return {value: getComponentWorkerURN(mustGetEnv(envVarKeys.USER_COMPONENT_ID), workerName)};
}

export function getPostWorkerURN(workerName: string): Uri {
    return {value: getComponentWorkerURN(mustGetEnv(envVarKeys.POST_COMPONENT_ID), workerName)};
}

// export function getComponentThreeWorkerURN(workerName: string): Uri {
//     return {value: getComponentWorkerURN(mustGetEnv(envVarKeys.COMPONENT_THREE_ID), workerName)};
// }