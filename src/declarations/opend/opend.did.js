export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'check_is_listed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'get_canisterID' : IDL.Func([], [IDL.Principal], ['query']),
    'get_owner_nft' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'list_item' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'mint' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
