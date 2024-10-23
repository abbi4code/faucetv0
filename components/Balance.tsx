"use client"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react'

export default function Balance() {
  const {connection} = useConnection();
  const wallet = useWallet()
  const [balance,Setbalance] = useState(0)
  const [loading,setLoading] = useState(false)

  async function getBalance(){
    setLoading(true)

    if(wallet?.publicKey){

      const balance = await connection.getBalance(wallet.publicKey)
      Setbalance(balance/LAMPORTS_PER_SOL)
      setLoading(false)

    }
    setLoading(false)
  }


  return (
    <div>
      <h1>click to show balance</h1>
      <div className={`${balance === 0 ? "hidden" : "block"}`}>{balance}</div>
      <button disabled={loading === true} onClick={getBalance}>{loading ? "wait" : "Get Balance"}</button>

      
    </div>
  )
}
