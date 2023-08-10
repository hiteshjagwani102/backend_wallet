import { ethers } from "ethers";
import { Request, Response } from "express";


const sendTransaction = async (req: Request, res: Response) => {
    try {
        const {to_address ,val} = req.body;
        const token = req.params.token;
        let provider: ethers.providers.JsonRpcProvider | undefined
        if (token == 'eth') {
            provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-rerllcimYjff9ItTfnoYW2EG7nP6ItC')
        }
        else if (token == 'polygon') provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.g.alchemy.com/v2/rzqPGkHcVupSjdlcffK4JMjRZPhbIfWo');


        if (provider instanceof ethers.providers.JsonRpcProvider) {
            const privateKey = process.env.PRIVATE_KEY as string;
            let wallet = new ethers.Wallet(privateKey,provider);
            const tx = {
                to:to_address,
                value: ethers.utils.parseEther(val)
            }
            try{
                const txHash = await wallet.sendTransaction(tx);
                res.status(200).send(txHash);
            }catch(err:any){
                res.status(400).send(err.reason);
            }
            
        }
        else res.status(404).send("Token Not Found")


    } catch (err) {
        console.log(err);
    }
}

export default sendTransaction;