declare module "wasi:blobstore/types" {
  import type { InputStream } from "wasi:io/streams@0.2.0";
  import type { OutputStream } from "wasi:io/streams@0.2.0";
  /**
   * name of a container, a collection of objects.
   * The container name may be any valid UTF-8 string.
   */
  export type ContainerName = string;
  /**
   * name of an object within a container
   * The object name may be any valid UTF-8 string.
   */
  export type ObjectName = string;
  /**
   * TODO: define timestamp to include seconds since
   * Unix epoch and nanoseconds
   * https://github.com/WebAssembly/wasi-blob-store/issues/7
   */
  export type Timestamp = bigint;
  /**
   * size of an object, in bytes
   */
  export type ObjectSize = bigint;
  export type Error = string;
  /**
   * information about a container
   */
  export interface ContainerMetadata {
    /**
     * the container's name
     */
    name: ContainerName,
    /**
     * date and time container was created
     */
    createdAt: Timestamp,
  }
  /**
   * information about an object
   */
  export interface ObjectMetadata {
    /**
     * the object's name
     */
    name: ObjectName,
    /**
     * the object's parent container
     */
    container: ContainerName,
    /**
     * date and time the object was created
     */
    createdAt: Timestamp,
    /**
     * size of the object, in bytes
     */
    size: ObjectSize,
  }
  /**
   * identifier for an object that includes its container name
   */
  export interface ObjectId {
    container: ContainerName,
    object: ObjectName,
  }
  export type IncomingValueAsyncBody = InputStream;
  export type IncomingValueSyncBody = Uint8Array;
  export class OutgoingValue {
    outgoingValueWriteBody(): Result<OutputStream, void>;
    static newOutgoingValue(): OutgoingValue;
  }
  export class IncomingValue {
    incomingValueConsumeSync(): Result<IncomingValueSyncBody, Error>;
    incomingValueConsumeAsync(): Result<IncomingValueAsyncBody, Error>;
    size(): bigint;
  }
  export type Result<T, E> = { tag: 'ok', val: T } | { tag: 'err', val: E };
}
