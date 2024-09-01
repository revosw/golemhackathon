declare module "wasi:sockets/instance-network@0.2.0" {
  import type { Network } from "wasi:sockets/network@0.2.0";
  /**
   * Get a handle to the default network.
   */
  export function instanceNetwork(): Network;
}
