import React, { useState } from 'react'
import { ed25519 } from '@noble/curves/ed25519'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from "bs58"


export default function SignMsg() {
    const [input, setInput] = useState("")
    const {publicKey,signMessage} = useWallet()

    async function signMsg(){
        if(!publicKey) throw new Error("No wallet found connected")
        if(!signMessage) throw new Error("wallet does not supported");

        const encodedMsg = new TextEncoder().encode(input)
        console.log("encodedMsg",encodedMsg)

        const signature = await signMessage(encodedMsg)
        const result = await ed25519.verify(signature,encodedMsg,publicKey.toBytes())

        if(!result) throw new Error("Invalid msg signature");

        console.log("result",result)

        

        alert(`Msg signature: ${bs58.encode(signature)}`)

    }



  return (
    <div>
        <input type="text" placeholder='msg here...' onChange={(e)=> setInput(e.target.value)}/>
        <button onClick={signMsg}>Sign msg</button>
      
    </div>
  )
}
