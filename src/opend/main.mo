import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Prelude "mo:base/Prelude";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Bool "mo:base/Bool";

actor OpenD {

    private type Listing = {
        item_owner: Principal;
        item_price: Nat;
    };
    

    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var mapOfOwner = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var mapOfListing = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    

    public shared(msg) func mint(image_Data: [Nat8], name: Text): async Principal {
        let owner: Principal = msg.caller;

        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, image_Data);

        // let new_cft_principal: Principal = Principal.fromActor(newNFT);
        Debug.print(debug_show(Cycles.balance()));
        let new_NFT_principal = await newNFT.get_canister_ID();

        mapOfNFTs.put(new_NFT_principal, newNFT);
        add_owner(owner, new_NFT_principal);

        return new_NFT_principal

    };

    private func add_owner(owner_id: Principal, nft_id: Principal) {
        var owner_nft: List.List<Principal> = switch(mapOfOwner.get(owner_id)) {
            case(null) { List.nil<Principal>() };
            case(?result) { result };
        };

        owner_nft := List.push(nft_id, owner_nft);
        mapOfOwner.put(owner_id, owner_nft);
    };

    public query func get_owner_nft(owner_id: Principal): async [Principal]{
        let owner_nfts: List.List<Principal> = switch(mapOfOwner.get(owner_id)) {
            case(null) { List.nil<Principal>() };
            case(?result) { result };
        };

        return List.toArray(owner_nfts);
    };

    public shared(msg) func list_item(id: Principal, price: Nat): async Text{
        let item: NFTActorClass.NFT = switch(mapOfNFTs.get(id)) {
            case(null) return "NFT doesnot exist";
            case(?result) { result };
        };

        let owner = await item.get_owner();
        if(Principal.equal(owner, msg.caller)){
            let new_listing: Listing = {
                item_owner = owner;
                item_price = price;
            };
            mapOfListing.put(id, new_listing);
            return "Success";

        } else {
            return "You dont own the NFT";
        }

    };

    public query func get_canisterID(): async Principal{
        return Principal.fromActor(OpenD);
    };

    public query func check_is_listed(id: Principal): async Bool{
        // switch(mapOfListing.get(id)){
        //     case (null) return false;
        //     case (?result) return true;
        // } 
        if (mapOfListing.get(id) == null){
            return false;
        } else {
            return true;
        }
    }
};
