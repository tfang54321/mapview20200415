import React, { Component } from "react";
import { InfoRow } from "../../../../helpers/InfoRow.jsx";
import * as helpers from "../../../../helpers/helpers";
import "./LocalRealEstatePopupContent.css";

const LocalRealEstatePopupContent = props => {
  const { feature } = props;
  const entries = Object.entries(feature.getProperties());

  let urlThumb = "";
  entries.forEach(row => {
    if (row[0] === "thumb_url") urlThumb = row[1];
  });

  let urlField = "";
  entries.forEach(row => {
    if (row[0] === "url_link") urlField = row[1];
  });

  let photosUrl = "";
  entries.forEach(row => {
    if (row[0] === "mlsno") photosUrl = `${props.photosUrl}TYPE=REALESTATE&ID=${row[1]}`;
  });

  const onPhotosClick = () => {
    if (window.outerWidth < 1000) helpers.showURLWindow(photosUrl, false, "full");
    else helpers.showURLWindow(photosUrl, false);

    props.onViewed(feature);
  };

  const onListingClick = () => {
    window.open(urlField, "_blank");

    // REALTOR.CA HAS UNSAFE SCRIPTS ;(
    // if (window.outerWidth < 1000) window.open(urlField, "_blank");
    // else helpers.showURLWindow(urlField, false);
    props.onViewed(feature);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img src={urlThumb} alt="logo" />
      </div>
      {entries.map(row => {
        if (row[0] !== "Address" && row[0] !== "Municipality") return null;
        if (row[0] !== "geometry" && row[0].substring(0, 1) !== "_") {
          return <InfoRow key={helpers.getUID()} value={row[1]} label={row[0]} />;
        } else return null;
      })}
      <div className="sc-theme-popup-content-button-container">
        <button className="sc-button sc-theme-popup-content-button" onClick={onPhotosClick}>
          Photos
        </button>
        <button className="sc-button sc-theme-popup-content-button padded" onClick={onListingClick}>
          Listing
        </button>
        <button
          className="sc-button sc-theme-popup-content-button"
          onClick={() => {
            window.popup.hide();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocalRealEstatePopupContent;
