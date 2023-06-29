export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'check_is_listed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'complete_purchase' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Principal],
        [IDL.Text],
        [],
      ),
    'get_canisterID' : IDL.Func([], [IDL.Principal], ['query']),
    'get_listed_NFTs' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'get_original_owner' : IDL.Func(
        [IDL.Principal],
        [IDL.Principal],
        ['query'],
      ),
    'get_owner_nft' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'get_price' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'list_item' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'mint' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
