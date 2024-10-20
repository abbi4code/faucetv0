"use client";
import React, { useEffect, useState } from "react";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
import bgimg from "../public/bg.jpeg";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";
import { Label } from "./ui/label";
import Image from "next/image";
import Loading from "./Loading";
// import Airdrop from './Airdrop';

export default function Connection() {
  // const network =WalletAdapterNetwork.Devnet
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "";
  const [loading,setLoading] = useState(true)
  console.log("rpcUrl", rpcUrl);

  useEffect(()=>{

    const timer = setTimeout(()=>{
      setLoading(false)

    },2000)

    return () => clearTimeout(timer)


  },[])
  

  // const endpoint = useMemo(()=>clusterApiUrl(network) ,[network])
  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {loading && <Loading/>}
          <Image
            src={bgimg}
            alt="faucet"
            className={`${loading ? "hidden" : "block"} absolute top-0 left-0 h-screen object-cover`} 
          />
          <div className={`${loading ? "hidden" : "block"}  h-screen font-custom w-full grid md:grid-cols-2`}>
            <div className="h-screen w-full flex flex-col justify-center items-center gap-8 z-10 md:col-span-1">
              <Header/>
              <Airdrop />
              <div className="border border-black flex flex-col w-[20rem] sm:min-w-[35rem] px-5 py-2 rounded  items-center  z-10">
                <Label className="font-bold selection:bg-yellow-700 tracking-wider font-custom text-4xl mt-3 mb-5">
                  Connect Your Wallet
                </Label>
                <ButtonModel/>
                
              </div>
            </div>
            <div className="hidden md:col-span-1"></div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function ButtonModel() {
  const wallet = useWallet();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    // Ensure window is defined before accessing it
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  console.log("wallet", wallet.publicKey?.toString());

  return (
    <div className="flex justify-around items-center w-full">
      <WalletMultiButton
        style={{
          fontSize: windowWidth && windowWidth < 640 ? ".7rem" : "1rem",
          width: "100%",
          maxWidth: windowWidth && windowWidth < 640 ? "8rem" : "10rem",
          textAlign: "center",
          padding: "0.75rem 1rem",
          backgroundColor: "black",
        }}
      />
      {wallet.publicKey && (
        <WalletDisconnectButton
          style={{
            fontSize: windowWidth && windowWidth < 640 ? ".7rem" : "1rem",
            width: "100%",
            maxWidth: windowWidth && windowWidth < 640 ? "8rem" : "10rem",
            textAlign: "center",
            padding: "0.75rem 1rem",
            backgroundColor: "black",
          }}
        />
      )}
    </div>
  );
}


function Header(){
  return (
   <span className="text-4xl md:text-7xl font-bold tracking-wider">
    Solana 
   </span>
  )
}