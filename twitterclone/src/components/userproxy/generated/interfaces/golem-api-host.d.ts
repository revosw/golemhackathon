declare module "golem:api/host@0.2.0" {
  import type { Uri } from "golem:rpc/types@0.1.0";
  import type { Duration } from "wasi:clocks/monotonic-clock@0.2.0";
  /**
   * An index into the persistent log storing all performed operations of a worker
   */
  export type OplogIndex = bigint;
  /**
   * Represents a Golem component's version
   */
  export type ComponentVersion = bigint;
  /**
   * UUID
   */
  export interface Uuid {
    highBits: bigint,
    lowBits: bigint,
  }
  /**
   * Represents a Golem component
   */
  export interface ComponentId {
    uuid: Uuid,
  }
  /**
   * Represents a Golem worker
   */
  export interface WorkerId {
    componentId: ComponentId,
    workerName: string,
  }
  /**
   * A promise ID is a value that can be passed to an external Golem API to complete that promise
   * from an arbitrary external source, while Golem workers can await for this completion.
   */
  export interface PromiseId {
    workerId: WorkerId,
    oplogIdx: OplogIndex,
  }
  /**
   * Configures how the executor retries failures
   */
  export interface RetryPolicy {
    /**
     * The maximum number of retries before the worker becomes permanently failed
     */
    maxAttempts: number,
    /**
     * The minimum delay between retries (applied to the first retry)
     */
    minDelay: Duration,
    /**
     * The maximum delay between retries
     */
    maxDelay: Duration,
    /**
     * Multiplier applied to the delay on each retry to implement exponential backoff
     */
    multiplier: number,
  }
  /**
   * Configurable persistence level for workers
   */
  export type PersistenceLevel = PersistenceLevelPersistNothing | PersistenceLevelPersistRemoteSideEffects | PersistenceLevelSmart;
  export interface PersistenceLevelPersistNothing {
    tag: 'persist-nothing',
  }
  export interface PersistenceLevelPersistRemoteSideEffects {
    tag: 'persist-remote-side-effects',
  }
  export interface PersistenceLevelSmart {
    tag: 'smart',
  }
  /**
   * Describes how to update a worker to a different component version
   * # Variants
   * 
   * ## `"automatic"`
   * 
   * Automatic update tries to recover the worker using the new component version
   * and may fail if there is a divergence.
   * ## `"snapshot-based"`
   * 
   * Manual, snapshot-based update uses a user-defined implementation of the `save-snapshot` interface
   * to store the worker's state, and a user-defined implementation of the `load-snapshot` interface to
   * load it into the new version.
   */
  export type UpdateMode = 'automatic' | 'snapshot-based';
  /**
   * # Variants
   * 
   * ## `"equal"`
   * 
   * ## `"not-equal"`
   * 
   * ## `"greater-equal"`
   * 
   * ## `"greater"`
   * 
   * ## `"less-equal"`
   * 
   * ## `"less"`
   */
  export type FilterComparator = 'equal' | 'not-equal' | 'greater-equal' | 'greater' | 'less-equal' | 'less';
  /**
   * # Variants
   * 
   * ## `"equal"`
   * 
   * ## `"not-equal"`
   * 
   * ## `"like"`
   * 
   * ## `"not-like"`
   */
  export type StringFilterComparator = 'equal' | 'not-equal' | 'like' | 'not-like';
  /**
   * # Variants
   * 
   * ## `"running"`
   * 
   * The worker is running an invoked function
   * ## `"idle"`
   * 
   * The worker is ready to run an invoked function
   * ## `"suspended"`
   * 
   * An invocation is active but waiting for something (sleeping, waiting for a promise)
   * ## `"interrupted"`
   * 
   * The last invocation was interrupted but will be resumed
   * ## `"retrying"`
   * 
   * The last invocation failed and a retry was scheduled
   * ## `"failed"`
   * 
   * The last invocation failed and the worker can no longer be used
   * ## `"exited"`
   * 
   * The worker exited after a successful invocation and can no longer be invoked
   */
  export type WorkerStatus = 'running' | 'idle' | 'suspended' | 'interrupted' | 'retrying' | 'failed' | 'exited';
  export interface WorkerNameFilter {
    comparator: StringFilterComparator,
    value: string,
  }
  export interface WorkerStatusFilter {
    comparator: FilterComparator,
    value: WorkerStatus,
  }
  export interface WorkerVersionFilter {
    comparator: FilterComparator,
    value: bigint,
  }
  export interface WorkerCreatedAtFilter {
    comparator: FilterComparator,
    value: bigint,
  }
  export interface WorkerEnvFilter {
    name: string,
    comparator: StringFilterComparator,
    value: string,
  }
  export type WorkerPropertyFilter = WorkerPropertyFilterName | WorkerPropertyFilterStatus | WorkerPropertyFilterVersion | WorkerPropertyFilterCreatedAt | WorkerPropertyFilterEnv;
  export interface WorkerPropertyFilterName {
    tag: 'name',
    val: WorkerNameFilter,
  }
  export interface WorkerPropertyFilterStatus {
    tag: 'status',
    val: WorkerStatusFilter,
  }
  export interface WorkerPropertyFilterVersion {
    tag: 'version',
    val: WorkerVersionFilter,
  }
  export interface WorkerPropertyFilterCreatedAt {
    tag: 'created-at',
    val: WorkerCreatedAtFilter,
  }
  export interface WorkerPropertyFilterEnv {
    tag: 'env',
    val: WorkerEnvFilter,
  }
  export interface WorkerAllFilter {
    filters: WorkerPropertyFilter[],
  }
  export interface WorkerAnyFilter {
    filters: WorkerAllFilter[],
  }
  export interface WorkerMetadata {
    workerId: WorkerId,
    args: string[],
    env: [string, string][],
    status: WorkerStatus,
    componentVersion: bigint,
    retryCount: bigint,
  }
  /**
   * Create a new promise
   */
  export function createPromise(): PromiseId;
  /**
   * Suspends execution until the given promise gets completed, and returns the payload passed to
   * the promise completion.
   */
  export function awaitPromise(promiseId: PromiseId): Uint8Array;
  /**
   * Completes the given promise with the given payload. Returns true if the promise was completed, false
   * if the promise was already completed. The payload is passed to the worker that is awaiting the promise.
   */
  export function completePromise(promiseId: PromiseId, data: Uint8Array): boolean;
  /**
   * Deletes the given promise
   */
  export function deletePromise(promiseId: PromiseId): void;
  /**
   * Returns a Golem worker URI that can be used to invoke a given function on the current worker
   */
  export function getSelfUri(functionName: string): Uri;
  /**
   * Returns the current position in the persistent op log
   */
  export function getOplogIndex(): OplogIndex;
  /**
   * Makes the current worker travel back in time and continue execution from the given position in the persistent
   * op log.
   */
  export function setOplogIndex(oplogIdx: OplogIndex): void;
  /**
   * Blocks the execution until the oplog has been written to at least the specified number of replicas,
   * or the maximum number of replicas if the requested number is higher.
   */
  export function oplogCommit(replicas: number): void;
  /**
   * Marks the beginning of an atomic operation.
   * In case of a failure within the region selected by `mark-begin-operation` and `mark-end-operation`
   * the whole region will be reexecuted on retry.
   * The end of the region is when `mark-end-operation` is called with the returned oplog-index.
   */
  export function markBeginOperation(): OplogIndex;
  /**
   * Commits this atomic operation. After `mark-end-operation` is called for a given index, further calls
   * with the same parameter will do nothing.
   */
  export function markEndOperation(begin: OplogIndex): void;
  /**
   * Gets the current retry policy associated with the worker
   */
  export function getRetryPolicy(): RetryPolicy;
  /**
   * Overrides the current retry policy associated with the worker. Following this call, `get-retry-policy` will return the
   * new retry policy.
   */
  export function setRetryPolicy(newRetryPolicy: RetryPolicy): void;
  /**
   * Gets the worker's current persistence level.
   */
  export function getOplogPersistenceLevel(): PersistenceLevel;
  /**
   * Sets the worker's current persistence level. This can increase the performance of execution in cases where durable
   * execution is not required.
   */
  export function setOplogPersistenceLevel(newPersistenceLevel: PersistenceLevel): void;
  /**
   * Gets the current idempotence mode. See `set-idempotence-mode` for details.
   */
  export function getIdempotenceMode(): boolean;
  /**
   * Sets the current idempotence mode. The default is true.
   * True means side-effects are treated idempotent and Golem guarantees at-least-once semantics.
   * In case of false the executor provides at-most-once semantics, failing the worker in case it is
   * not known if the side effect was already executed.
   */
  export function setIdempotenceMode(idempotent: boolean): void;
  /**
   * Generates an idempotency key. This operation will never be replayed —
   * i.e. not only is this key generated, but it is persisted and committed, such that the key can be used in third-party systems (e.g. payment processing)
   * to introduce idempotence.
   */
  export function generateIdempotencyKey(): Uuid;
  /**
   * Initiates an update attempt for the given worker. The function returns immediately once the request has been processed,
   * not waiting for the worker to get updated.
   */
  export function updateWorker(workerId: WorkerId, targetVersion: ComponentVersion, mode: UpdateMode): void;
  /**
   * Get current worker metadata
   */
  export function getSelfMetadata(): WorkerMetadata;
  /**
   * Get worker metadata
   */
  export function getWorkerMetadata(workerId: WorkerId): WorkerMetadata | undefined;
  export class GetWorkers {
    constructor(componentId: ComponentId, filter: WorkerAnyFilter | undefined, precise: boolean)
    getNext(): WorkerMetadata[] | undefined;
  }
}
