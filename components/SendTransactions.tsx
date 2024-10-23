"use client"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import React, { useState } from 'react'


export default function SendTransactions() {
    const {connection} = useConnection();
    const wallet = useWallet()
    const [amount,setAmount] = useState(0)
    const [reciPubkey,setReciPubkey] = useState("")
    async function sendTokens(){

        const transactions = new Transaction()
        transactions.add(SystemProgram.transfer({
            fromPubkey: wallet?.publicKey,
            toPubkey: reciPubkey,
            lamports: amount * LAMPORTS_PER_SOL
        }))

        await wallet.sendTransaction(transactions,connection);
        alert(`${amount} SOl transfer to ${reciPubkey}`)
    }
  return (
    <div>
        <input type="text" placeholder='Enter recipent public id' onChange={(e)=> setReciPubkey(e.target.value)}/>
        <input type="text" placeholder='enter amount' onChange={(e)=>setAmount(Number(e.target.value))}/>
        <button onClick={sendTokens}>Send</button>
      
    </div>
  )
}
