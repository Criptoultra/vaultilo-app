import React, { useState } from "react";
import "./extension.css";
import { Link } from "react-router-dom";
import OpenVaultilo from ".//Icons/OpenVaultilo.png";

export default function ExPwShow(props) {
  const passwords = props.passwords;
  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Passwords</div>
      </div>
      <div className="ext-content">
        <div className="title">
          Password
        </div>
        <div className="content-list">

          {
            passwords.map(item => {
              const {
                id,
                domainName,
                domainAddress
              } = item;
              return (
                <div className="item d-flex justify-content-start" key={id}>
                  <div className="item-img">
                    <i className="icon-password" />
                  </div>
                  <div className="item-detail">
                    <div className="text">{domainName}</div>
                    <div className="sub-text">{domainAddress}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
    </div>
  );
}
