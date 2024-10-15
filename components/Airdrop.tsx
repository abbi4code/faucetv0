"use client"

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'

export default function Airdrop() {
    const connection = useConnection()
    // console.log(connection.connection)
    const {publicKey} = useWallet()
    console.log(publicKey?.toString())
    const [amount,setAmount] = useState(0);
    const [address,setAddress] =useState("")

    const handleAirdrop = async()=>{
        console.log("amount",amount)
        const result = await connection.connection.requestAirdrop(publicKey,amount);
        // console.log(result)
        toast.success(`${amount} is credited to address ${publicKey?.toString()}`)
        alert(`airdropped ${amount} to ${publicKey} and the result is ${result}`)
        // alert(publicKey?.toBase58())
    }


  return (
    <div className='flex flex-col'>
        <Label>Enter Amount</Label>
        <Input placeholder='Enter Amount' value={amount} onChange={(e)=> setAmount(Number(e.target.value))}/>
        <Label>Enter Wallet Address</Label>
        <Input placeholder='Enter Address' />
        <Button disabled={amount === 0} className='w-full my-3 rounded-[4px]'  variant={'outline'} onClick={handleAirdrop}>Confirm Airdrop</Button>
        

        
      
    </div>
  )
}
