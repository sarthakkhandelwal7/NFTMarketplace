import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import Minter from "./Minter";
import Gallery from "./Gallery";
import homeImage from "../../assets/home-img.png";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";


function Header() {
  const [userOwnedGallery, setuserOwnedGallery] = useState();
  const [listing_gallery, set_listing_gallery] = useState();

  async function get_nfts(){
    const userNftIds = await opend.get_owner_nft(CURRENT_USER_ID);
    const listed_NFT_IDs = await opend.get_listed_NFTs();

    setuserOwnedGallery(<Gallery title="My NFT's" ids={userNftIds} role="collections"/>);
    set_listing_gallery(<Gallery title="Discover" ids={listed_NFT_IDs} role="discover"/>);
  }

  useEffect(() => {
    get_nfts()
  }, [])

  return (
    <BrowserRouter forceRefresh>
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <img className="header-logo-11" src={logo} />
          <div className="header-vertical-9"></div>
          <Link to="/">
          <h5 className="Typography-root header-logo-text">OpenD</h5>
          </Link>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/discover"> Discover </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/minter"> Minter </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/gallery"> My NFTs </Link>
          </button>
        </div>
      </header>
    </div>
    <Switch>
      <Route exact path="/">
        <img className="bottom-space" src={homeImage} />
      </Route>
      <Route path="/discover">
        {listing_gallery}
      </Route>
      <Route path="/minter">
        <Minter />
      </Route>
      <Route path="/gallery">
        {userOwnedGallery}
      </Route>
      
    </Switch>
    </BrowserRouter>
    
  );
}

export default Header;
