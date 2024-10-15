"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function Airdrop() {
  const connection = useConnection();
  // console.log(connection.connection)
  const { publicKey } = useWallet();
//   console.log(publicKey?.toString());
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");

  const handleAirdrop = async () => {
    console.log("amount", amount);
    const result = await connection.connection.requestAirdrop(
      publicKey,
      amount
    );
    // console.log(result)
    toast.success(`${amount} is credited to address ${publicKey?.toString()}`);
    alert(`airdropped ${amount} to ${publicKey} and the result is ${result}`);
    // alert(publicKey?.toBase58())
  };

  return (
    <div className="flex flex-col border border-gray-500 rounded-[4px] px-4 py-5 w-max md:min-w-[30rem] bg-red-300 z-10 ">
      <Label className="font-semibold text-3xl tracking-wider">Enter Amount</Label>
   
      <Input
        placeholder="Enter Amount"
        className="rounded-[4px] border border-[#27272A]"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Label className="font-semibold text-3xl tracking-wider">Enter Wallet Address</Label>
      <Input placeholder="Enter Address" className="rounded-[4px] border border-[#27272A]"/>
      <Button
        disabled={amount === 0}
        className="w-full my-3 rounded-[4px]"
        variant={"outline"}
        onClick={handleAirdrop}
      >
        Confirm Airdrop
      </Button>
    </div>
  );
}
