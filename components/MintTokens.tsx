"use client";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";
import { getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createInitializeMint2Instruction } from "@solana/spl-token";

export default function MintTokens() {
  const {connection} = useConnection()
  const wallet = useWallet();
  // if (!wallet.publicKey) {
  //   throw new Error("Wallet not connected or not supported");
  // }
  console.log("walletttttttttttt", wallet.publicKey?.toString())

  const mintToken = async () => {
    const keypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection)

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet?.publicKey,
        newAccountPubkey: keypair.publicKey,
        lamports,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
      }),
      //this will actully put all above data into out token 
      createInitializeMint2Instruction(keypair.publicKey,5,wallet.publicKey,wallet.publicKey,TOKEN_PROGRAM_ID)
    );
    transaction.feePayer = wallet?.publicKey
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash


    await transaction.partialSign(keypair)
    await wallet.sendTransaction(transaction,connection)
  };


  return (
    <div>
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <button onClick={mintToken}>Create Token</button>
    </div>
  );
}
