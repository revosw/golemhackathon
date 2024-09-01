declare module "wasi:blobstore/container" {
  import type { InputStream } from "wasi:io/streams@0.2.0";
  import type { OutputStream } from "wasi:io/streams@0.2.0";
  import type { ContainerMetadata } from "wasi:blobstore/types";
  import type { Error } from "wasi:blobstore/types";
  import type { IncomingValue } from "wasi:blobstore/types";
  import type { ObjectMetadata } from "wasi:blobstore/types";
  import type { ObjectName } from "wasi:blobstore/types";
  import type { OutgoingValue } from "wasi:blobstore/types";
  export class Container {
    /**
     * returns container name
     */
    name(): Result<string, Error>;
    /**
     * returns container metadata
     */
    info(): Result<ContainerMetadata, Error>;
    /**
     * retrieves an object or portion of an object, as a resource.
     * Start and end offsets are inclusive.
     * Once a data-blob resource has been created, the underlying bytes are held by the blobstore service for the lifetime
     * of the data-blob resource, even if the object they came from is later deleted.
     */
    getData(name: ObjectName, start: bigint, end: bigint): Result<IncomingValue, Error>;
    /**
     * creates or replaces an object with the data blob.
     */
    writeData(name: ObjectName, data: OutgoingValue): Result<void, Error>;
    /**
     * returns list of objects in the container. Order is undefined.
     */
    listObjects(): Result<StreamObjectNames, Error>;
    /**
     * deletes object.
     * does not return error if object did not exist.
     */
    deleteObject(name: ObjectName): Result<void, Error>;
    /**
     * deletes multiple objects in the container
     */
    deleteObjects(names: ObjectName[]): Result<void, Error>;
    /**
     * returns true if the object exists in this container
     */
    hasObject(name: ObjectName): Result<boolean, Error>;
    /**
     * returns metadata for the object
     */
    objectInfo(name: ObjectName): Result<ObjectMetadata, Error>;
    /**
     * removes all objects within the container, leaving the container empty.
     */
    clear(): Result<void, Error>;
  }
  export class StreamObjectNames {
    /**
     * reads the next number of objects from the stream
     * 
     * This function returns the list of objects read, and a boolean indicating if the end of the stream was reached.
     */
    readStreamObjectNames(len: bigint): Result<[ObjectName[], boolean], Error>;
    /**
     * skip the next number of objects in the stream
     * 
     * This function returns the number of objects skipped, and a boolean indicating if the end of the stream was reached.
     */
    skipStreamObjectNames(num: bigint): Result<[bigint, boolean], Error>;
  }
  export type Result<T, E> = { tag: 'ok', val: T } | { tag: 'err', val: E };
}
