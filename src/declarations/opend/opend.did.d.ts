import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'check_is_listed' : (arg_0: Principal) => Promise<boolean>,
  'complete_purchase' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: Principal,
    ) => Promise<string>,
  'get_canisterID' : () => Promise<Principal>,
  'get_listed_NFTs' : () => Promise<Array<Principal>>,
  'get_original_owner' : (arg_0: Principal) => Promise<Principal>,
  'get_owner_nft' : (arg_0: Principal) => Promise<Array<Principal>>,
  'get_price' : (arg_0: Principal) => Promise<bigint>,
  'list_item' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'mint' : (arg_0: Array<number>, arg_1: string) => Promise<Principal>,
}
