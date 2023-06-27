import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'check_is_listed' : (arg_0: Principal) => Promise<boolean>,
  'get_canisterID' : () => Promise<Principal>,
  'get_owner_nft' : (arg_0: Principal) => Promise<Array<Principal>>,
  'list_item' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'mint' : (arg_0: Array<number>, arg_1: string) => Promise<Principal>,
}
