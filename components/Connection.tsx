"use client"
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';



export default function Connection() {
    // const network =WalletAdapterNetwork.Devnet


    // const endpoint = useMemo(()=>clusterApiUrl(network) ,[network])
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/ThulD-kwRxO3R7wbCbk5JmL6Rixm803N"}>
    <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            { /* Your app's components go here, nested within the context providers. */ }
            <Airdrop/>
        </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
  )
}
