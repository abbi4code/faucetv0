/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function Airdrop() {
  const connection = useConnection();
  // console.log(connection.connection)
  const wallet = useWallet();
//   console.log(publicKey?.toString());
  const [amount, setAmount] = useState(0);

  const [address, setAddress] = useState("");
  useEffect(()=>{
    //@ts-expect-error
    setAddress(wallet.publicKey?.toString())

    return ()=> setAddress("")

  },[wallet.publicKey])

  const handleAirdrop = async () => {
    
    alert(wallet.publicKey)
//@ts-ignore
    await connection.connection.requestAirdrop(wallet.publicKey,amount);

    toast.success(`${amount} Successfully is transferred`);
    // alert(publicKey?.toBase58())
  };

  return (
    <div className="flex flex-col selection:bg-[#09090B] selection:text-white border border-gray-600 rounded-[4px] px-4 py-5 w-max md:min-w-[35rem]  z-10 ">
      <Label className="font-semibold text-3xl tracking-wider mb-2">Enter Amount</Label>
   
      <Input
        placeholder="Enter Amount"
        className="rounded-[4px] border mb-4 border-[#27272A]"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Label className="font-semibold text-3xl tracking-wider">Enter Wallet Address</Label>
      <Input placeholder="Enter Address" className="rounded-[4px] border border-[#27272A] text-xl mb-6" value={address}/>
      <Button
        disabled={amount === 0}
        className="w-full my-3 rounded-[4px] text-2xl font-semibold tracking-wider hover:bg-[#09090B] hover:text-white"
        variant={"outline"}
        onClick={handleAirdrop}
      >
        Confirm Airdrop
      </Button>
    </div>
  );
}
