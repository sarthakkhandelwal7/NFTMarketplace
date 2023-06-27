import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";

actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {
    private let item_name = name;
    private var nft_owner = owner;
    private let image_bytes = content;

    public query func get_name(): async Text{
        return item_name
    };

    public query func get_owner(): async Principal{
        return nft_owner;
    };

    public query func get_image(): async [Nat8]{
        return image_bytes;
    };
    
    public query func get_canister_ID(): async Principal{
        return Principal.fromActor(this);
    };

    public shared(msg) func transfer_ownership(new_owner: Principal): async Text {
        if(msg.caller == nft_owner){
            nft_owner := new_owner;
            return "Success"
        } else {
            return "Not initiated by the owner of NFT";
        }
    }
};