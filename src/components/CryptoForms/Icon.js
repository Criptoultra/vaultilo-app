import React, { useEffect, useState } from "react";

export default function Icon(props) {
  const {
    credentials,
    setCredentials,
    subType,
    onModalClose,
    selectedItem
  } = props;

  const defaultValue = selectedItem
    ? {
        walletName: selectedItem.walletName,
        walletAddress: selectedItem.walletAddress,
        privateKey: selectedItem.privateKey,
        password: selectedItem.password
      }
    : {
        walletName: "",
        walletAddress: "",
        privateKey: "",
        password: ""
      };

  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [privateKey, setPrivateKey] = useState(defaultValue.privateKey);
  const [password, setPassword] = useState(defaultValue.password);
  const [clicked, setClicked] = useState(false);


  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [credentials]);

  const validateForm = () => {
    return (
      walletName.length &&
      walletAddress.length &&
      password.length &&
      privateKey.length
    );
  };

  const handleClick = () => {
    if (validateForm()) {
      const newCred = {
        id: Date.now(),
        type: "crypto",
        subType,
        walletName,
        walletAddress,
        privateKey,
        password
      };
      const oldCred = credentials ? JSON.parse(credentials) : [];
      setClicked(true);
      setCredentials(JSON.stringify([...oldCred, newCred]));
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedCredentials = JSON.parse(credentials).map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, walletName, walletAddress, privateKey, password };
        }
        return item;
      });
      setClicked(true);
      setCredentials(JSON.stringify(updatedCredentials));
    }
  };

  return (
    <>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-4 col-form-label">
          Icon Wallet Name
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={walletName}
            onChange={evt => setWalletName(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputAddress" className="col-4 col-form-label">
          Wallet Address
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={walletAddress}
            onChange={evt => setWalletAddress(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPrivateKey" className="col-4 col-form-label">
          Private Key
        </label>
        <div className="col-8">
          <input
            type="password"
            className="form-control"
            id="inputPrivateKey"
            value={privateKey}
            onChange={evt => setPrivateKey(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-4 col-form-label">
          Password
        </label>
        <div className="col-8">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-start">
        <button type="button" className="btn btn-secondary mr-2" size="small">
          Upload Keystore
        </button>
      </div>
      <div className="d-flex justify-content-end">
        {selectedItem ? (
          <button
            disabled={clicked}
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            disabled={clicked}
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClick}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onModalClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
