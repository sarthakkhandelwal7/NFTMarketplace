import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token"
import { Principal } from "@dfinity/principal";
import Button from "./button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";

function Item(props) {

  const [name, set_name] = useState("");
  const [owner, set_owner] = useState("");
  const [image_url, set_image_url] = useState();
  const [sell_button, set_button] = useState();
  const [price_input, set_price] = useState();
  const [loader_hidden, set_loader_hidden] = useState(true);
  const [blur, set_blur] = useState();
  const [status, set_status] = useState("");
  const [price_label, set_price_label] = useState();
  const [should_display, set_display] = useState(true);

  const id = props.id;
  const local_host = "http://localhost:8080/";
  const agent = new HttpAgent({host: local_host});

  //TODO: Remove below line when deploy live
  agent.fetchRootKey()
  let NFTActor;

  async function load_NFT(){
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id, // Not canisterI'D' it is small d
    });
    const owner = await NFTActor.get_owner();
    set_name(await NFTActor.get_name());
    set_owner(owner.toText());
    const image_content = new Uint8Array(await NFTActor.get_image());
    set_image_url(URL.createObjectURL(
      new Blob([image_content.buffer], {type: "image/png"})
    ))
    const is_listed = await opend.check_is_listed(id);

    if (props.role == 'collections'){  
      if (is_listed) {
        set_blur({filter: "blur(4px"});
        set_owner("OpenD");
        set_status("Listed");
                
      } else {
        set_blur();
        set_button(<Button handleClick={handle_sell} text={"Sell"}/>)
      }
    } else if(props.role == 'discover'){
      const original_owner = await opend.get_original_owner(id);
      if(original_owner.toText() != CURRENT_USER_ID.toText()){
        set_button(<Button handleClick={handle_buy} text={"Buy"}/>);
      }

      const price = (await opend.get_price(id)).toString();
      set_price(<PriceLabel price={price}/>)
    }
  }

  useEffect(() => {
    load_NFT()
  }, [])

  let price;
  function handle_sell(){
    set_price(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => price=e.target.value}
    />);
    set_button(<Button handleClick={sell_item} text={"Confirm"}/>)
  }

  async function handle_buy(){
    set_loader_hidden(false)
    const token_actor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("q4eej-kyaaa-aaaaa-aaaha-cai")
    })

    const seller_id = await opend.get_original_owner(id);
    const price = await opend.get_price(id);

    const response = await token_actor.transfer(seller_id, price);
    console.log("Transfer success")
    if (response == "Success"){
      const response = await opend.complete_purchase(id, seller_id, CURRENT_USER_ID);
      console.log(response);
      set_loader_hidden(true);
      set_display(false);
    }
    
  }

  async function sell_item(){
    set_blur({filter: "blur(4px"})
    set_loader_hidden(false);
    console.log(price + " " + id)
    const response = await opend.list_item(id, Number(price));
    console.log(response);
    if (response == "Success"){
      const opend_ID = await opend.get_canisterID();
      const transfer_result = await NFTActor.transfer_ownership(opend_ID);
      console.log("Transfer: " + transfer_result);
      set_loader_hidden(true);
      set_button();
      set_price();
      set_owner("OpenD");
      set_status("Listed");
    }
  }

  return (
    <div style={{display: should_display ? "in_line" : "none"}} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image_url}
          style={blur}
        />
        <div hidden={loader_hidden} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div className="disCardContent-root">
          {price_label} 
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name} <span className="purple-text"> {status}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {price_input}
          {sell_button}
        </div>
      </div>
    </div>
  );
}

export default Item;
