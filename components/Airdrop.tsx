import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function Airdrop() {
    const connection = useConnection();
    const wallet = useWallet();
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState("");

    useEffect(() => {
        //@ts-expect-error: wallet.publicKey might be null or undefined
        setAddress(wallet.publicKey?.toString());

        return () => setAddress("");
    }, [wallet.publicKey]);

    const handleAirdrop = async () => {
        try {
            if (!wallet.connected) {
                toast.error("Wallet is not connected!");
                return;
            }
            

            console.log("Requesting airdrop...");
            if(wallet.publicKey){
                const signature = await connection.connection.requestAirdrop(wallet.publicKey, amount*Math.pow(10,9));
                console.log("signature",signature)
                await connection.connection.confirmTransaction(signature);
            }

            toast.success(`SOL successfully transferred`);
           

        } catch (error) {
            console.error("Error during airdrop: ", error);
            toast.error("Airdrop failed! Please try again.");
            
        }
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
            <Input placeholder="Enter Address" className="rounded-[4px] border border-[#27272A] text-xl mb-6" value={address} readOnly />
            <Button
                disabled={amount <= 0}
                className="w-full my-3 rounded-[4px] text-2xl font-semibold tracking-wider hover:bg-[#09090B] hover:text-white"
                variant={"outline"}
                onClick={handleAirdrop}
            >
                Confirm Airdrop
            </Button>
        </div>
    );
}
