"use client";
import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";
// import Airdrop from './Airdrop';

export default function Connection() {
  // const network =WalletAdapterNetwork.Devnet
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || ""
  console.log("rpcUrl",rpcUrl)
  // const endpoint = useMemo(()=>clusterApiUrl(network) ,[network])
  return (
    <ConnectionProvider
      endpoint={rpcUrl}
      
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="h-screen w-full flex flex-col justify-center items-center">
          <Airdrop/>
        <div className="border border-black">
          <WalletMultiButton/>
          <WalletDisconnectButton/>
        </div>
          </div>
        
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
