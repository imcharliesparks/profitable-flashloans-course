require('dotenv').config()
import Web3, { BlockHeader } from 'web3'

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.MAINNET_INFURA_SOCKET_URL)
)

export default function runArbitrage(): void {
    web3.eth.subscribe("newBlockHeaders")
        .on('data', async (block: BlockHeader) => {
            console.log('block.number', block.number)
        })
        .on('error', (e: Error) => {
            console.log('e', e)
        })
}