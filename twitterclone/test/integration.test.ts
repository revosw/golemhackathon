import {test} from "node:test";
import * as assert from "node:assert";
import {run, runCapture} from "../src/lib/process";
import {randomUUID} from "node:crypto";

test("Project is deployed", async (t) => {
    const componentOneMeta = await getComponentMeta("user");
    console.log(componentOneMeta);
    assert.ok(componentOneMeta);
    assert.ok(componentOneMeta["componentUrn"]);

    const componentTwoMeta = await getComponentMeta("post");
    console.log(componentTwoMeta);
    assert.ok(componentTwoMeta);
    assert.ok(componentTwoMeta["componentUrn"]);

    // const componentThreeMeta = await getComponentMeta("component-three");
    // console.log(componentThreeMeta);
    // assert.ok(componentThreeMeta);
    // assert.ok(componentThreeMeta["componentUrn"]);
});

test("Calling add on component one calls other components", async (t) => {
    // Setup
    const workerName = randomUUID();
    console.log(`Random worker name: ${workerName}`);

    const componentURNs = await getComponentURNs();
    console.log("Component URNs:", componentURNs);

    await addWorker("user", workerName, componentURNs);
    await addWorker("post", workerName, componentURNs);

    const result = await invokeAndAwaitWorker("user", workerName, "")

    // Check initial counter values
    assert.equal(await invokeWorkerGet("user", workerName), 0);
    assert.equal(await invokeWorkerGet("post", workerName), 0);
    // assert.equal(await invokeWorkerGet("component-three", workerName), 0);

    // Call add on user and check counter values
    await invokeWorkerAdd("user", workerName, 2);
    assert.equal(await invokeWorkerGet("user", workerName), 2);
    assert.equal(await invokeWorkerGet("post", workerName), 2);
    // assert.equal(await invokeWorkerGet("component-three", workerName), 4);

    // Call add on post and check counter values
    await invokeWorkerAdd("post", workerName, 3);
    assert.equal(await invokeWorkerGet("user", workerName), 2);
    assert.equal(await invokeWorkerGet("post", workerName), 5);
    // assert.equal(await invokeWorkerGet("component-three", workerName), 7);

    // Call add on component-three and check counter values
    // await invokeWorkerAdd("component-three", workerName, 1);
    // assert.equal(await invokeWorkerGet("user", workerName), 2);
    // assert.equal(await invokeWorkerGet("post", workerName), 5);
    // assert.equal(await invokeWorkerGet("component-three", workerName), 8);

    // Call add on user and check counter values
    await invokeWorkerAdd("user", workerName, 1);
    assert.equal(await invokeWorkerGet("user", workerName), 3);
    assert.equal(await invokeWorkerGet("post", workerName), 6);
    // assert.equal(await invokeWorkerGet("component-three", workerName), 10);
});

async function getComponentMeta(compName: string) {
    const result = await runCapture(
        "golem-cli",
        [
            "--format", "json",
            "component", "get",
            "--component-name", compName
        ]
    );

    if (result.code !== 0) {
        process.stdout.write(result.stdout);
        process.stderr.write(result.stderr);
        throw new Error(`component get for ${compName} failed with code ${result.code}`);
    }

    return JSON.parse(result.stdout);
}

interface ComponentURNs {
    user: string;
    post: string;
    // componentThree: string;
}

async function getComponentURNs(): Promise<ComponentURNs> {
    return {
        user: (await getComponentMeta("user"))["componentUrn"],
        post: (await getComponentMeta("post"))["componentUrn"],
        // componentThree: (await getComponentMeta("component-three"))["componentUrn"],
    };
}

function componentIdFromURN(compURN: string) {
    return compURN.split(":")[2] as string;
}

async function addWorker(compName: string, workerName: string, componentURNs: ComponentURNs) {
    console.log(`Adding worker: ${compName}, ${workerName}`);
    return run(
        "golem-cli",
        ["worker",
            "--format", "json",
            "add",
            "--component-name", compName,
            "--worker-name", workerName,
            "--env", `COMPONENT_ONE_ID=${componentIdFromURN(componentURNs.user)}`,
            "--env", `COMPONENT_TWO_ID=${componentIdFromURN(componentURNs.post)}`,
            // "--env", `COMPONENT_THREE_ID=${componentIdFromURN(componentURNs.componentThree)}`,
        ]
    );
}

async function invokeAndAwaitWorker(compName: string, workerName: string, functionName: string, functionArgs: string[]) {
    console.log(`Invoking worker: ${compName}, ${workerName}, ${functionName}, ${functionArgs}`);

    const result = await runCapture(
        "golem-cli",
        [
            "--format", "json",
            "worker",
            "invoke-and-await",
            "--component-name", compName,
            "--worker-name", workerName,
            "--function", functionName,
            ...(functionArgs.map(arg => ["--arg", arg]).flat()),
        ],
    );

    if (result.code !== 0) {
        process.stdout.write(result.stdout);
        process.stderr.write(result.stderr);
        throw new Error(`invoke and await worker failed with code ${result.code}`);
    }

    console.log(result.stdout);

    return JSON.parse(result.stdout);
}

async function invokeWorkerGet(compName: string, workerName: string) {
    const result = await invokeAndAwaitWorker(compName, workerName, `golem:${compName}/${compName}-api.{get}`, []);
    return result["value"][0] as number;
}

async function invokeWorkerAdd(compName: string, workerName: string, value: number) {
    await invokeAndAwaitWorker(compName, workerName, `golem:${compName}/${compName}-api.{add}`, [value.toString()]);
}

async function invokeUserGet() {

}