import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { connect, keyStores, transactions } from "near-api-js";
import "./assets/css/global.css";
import { login, logout } from "./assets/js/near/utils";

export default function App() {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const config = {
    keyStore, // instance of BrowserLocalStorageKeyStore
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  console.log("config", config.keyStore);

  console.log("key", keyStore.getKey("testnet", "khaled_lightency1.testnet"));
  console.log("ACCOUNTS", keyStore.getAccounts("testnet"));

  console.log("loggedin", window.accountId);

  async function batch_of_transactions() {
    const near = await connect({ ...config, keyStore });
    const account = await near.account("dev-1662475887748-24934254209173");
    console.log(account);
    const result = account.signAndSendTransaction({
      receiverId: "wrap.testnet",
      actions: [
        transactions.functionCall(
          "near_deposit",
          {},
          1500000000000,
          "5000000000000000000000000"
        ),
        transactions.functionCall(
          "ft_transfer",
          {
            receiver_id: "khaled_lightency1.testnet",
            amount: "1000000000000000000000000",
          },
          150000000000000,
          "1"
        ),
      ],
    });
  }

  if (!window.walletConnection.isSignedIn()) {
    return (
      <div className="container">
        <div className="header">
          <h1>NEAR React App</h1>
        </div>
        <div className="main">
          <div className="login">
            <button onClick={login}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>NEAR React App</h1>
      </div>
      <div className="header">
        <p>{window.accountId}</p>
      </div>

      <div className="main">
        <div className="logout">
          <button onClick={logout}>Logout</button>
          <button onClick={batch_of_transactions}>Batch of transactions</button>
        </div>
      </div>
    </div>
  );
}
