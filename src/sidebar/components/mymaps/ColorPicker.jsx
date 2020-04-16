import { SketchPicker } from "react-color";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Portal from "../../../helpers/Portal.jsx";

export default class ColorPicker {
  constructor(evt, elements, callerId) {
    this.evt = evt;
    this.elements = elements;
    this.callerId = callerId;

    // CLICK ANYWHERE ELSE WILL CLOSE MENU
    this.clickEvent = document.body.addEventListener(
      "click",
      evt => {
        const e = document.elementFromPoint(evt.pageX, evt.pageY);
        if (evt.target.id !== this.callerId && e.getAttribute("spellcheck") === null) this.hide();
      },
      true
    );
  }

  show() {
    if (document.getElementById("sc-color-picker-container") !== null) document.getElementById("sc-color-picker-container").classList.remove("sc-hidden");

    const portalStyle = {
      position: "absolute",
      zIndex: 10000,
      top: this.evt.pageY,
      left: this.evt.pageX
    };

    const menu = (
      <Portal>
        <div id="sc-color-picker-container" style={portalStyle}>
          {this.elements}
        </div>
      </Portal>
    );

    ReactDOM.render(menu, document.getElementById("portal-root"));
  }

  hide() {
    if (document.getElementById("sc-color-picker-container") !== null) document.getElementById("sc-color-picker-container").classList.add("sc-hidden");
  }
}
