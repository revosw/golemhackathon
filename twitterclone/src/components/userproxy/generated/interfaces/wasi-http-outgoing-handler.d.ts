declare module "wasi:http/outgoing-handler@0.2.0" {
  import type { OutgoingRequest } from "wasi:http/types@0.2.0";
  import type { RequestOptions } from "wasi:http/types@0.2.0";
  import type { FutureIncomingResponse } from "wasi:http/types@0.2.0";
  import type { ErrorCode } from "wasi:http/types@0.2.0";
  /**
   * This function is invoked with an outgoing HTTP Request, and it returns
   * a resource `future-incoming-response` which represents an HTTP Response
   * which may arrive in the future.
   * 
   * The `options` argument accepts optional parameters for the HTTP
   * protocol's transport layer.
   * 
   * This function may return an error if the `outgoing-request` is invalid
   * or not allowed to be made. Otherwise, protocol errors are reported
   * through the `future-incoming-response`.
   */
  export function handle(request: OutgoingRequest, options: RequestOptions | undefined): Result<FutureIncomingResponse, ErrorCode>;
  export type Result<T, E> = { tag: 'ok', val: T } | { tag: 'err', val: E };
}
