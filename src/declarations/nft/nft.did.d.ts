import type { Principal } from '@dfinity/principal';
export interface NFT {
  'get_canister_ID' : () => Promise<Principal>,
  'get_image' : () => Promise<Array<number>>,
  'get_name' : () => Promise<string>,
  'get_owner' : () => Promise<Principal>,
  'transfer_ownership' : (arg_0: Principal) => Promise<string>,
}
export interface _SERVICE extends NFT {}
