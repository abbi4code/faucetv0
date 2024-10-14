"use client"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'

export default function Airdrop() {
    const wallet = useWallet()
    // alert(wallet.publicKey)
    console.log(wallet)
    const [amount,setAmount] =useState(0)
    const connection = useConnection()

    async function sendAirdrop(){
        await connection.connection.requestAirdrop(wallet.publicKey ,amount*10000)
        alert(`airdropped ${amount} to this ${wallet.publicKey?.toString()}`)
    }
  return (
    <div>
        <h1>{wallet.publicKey?.toString()}</h1>
        <div>
            <input type="text" className='text-black' value={amount} onChange={(e)=>setAmount(Number(e.target.value))} />
            <button className='border border-white rounded-lg px-2 py-1' onClick={sendAirdrop}>Send</button>
        </div>
      
    </div>
  )
}
