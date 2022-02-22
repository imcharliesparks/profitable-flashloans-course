require('dotenv').config()
import Web3 from 'web3'
import abis from '../abis'
import { mainnet as addresses } from '../addresses'
import { BlockHeader } from './shared/types'

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.RINKEBY_INFURA_SOCKET_URL)
)

const kyber = new web3.eth.Contract(
    abis.kyber.kyberNetworkProxy,
    addresses.kyber.kyberNetworkProxy
)

const ETH_AMOUNT = 100
const RECENT_ETH_PRICE = 2596.13
const ETH_AMOUNT_IN_WEI = web3.utils.toWei(ETH_AMOUNT.toString())
const DAI_AMOUNT_IN_WEI = web3.utils.toWei((ETH_AMOUNT * RECENT_ETH_PRICE).toString())

const pollDaiToEth = () => {
    return kyber.methods.getExpectedRate(
        addresses.tokens.dai,
        addresses.tokens.kyberEth,
        DAI_AMOUNT_IN_WEI
    )
}

const pollEthToDai = () => {
    return kyber.methods.getExpectedRate(
        addresses.tokens.kyberEth,
        addresses.tokens.dai,
        ETH_AMOUNT_IN_WEI
    )
}

export default function runArbitrage(): void {
    web3.eth.subscribe("newBlockHeaders")
        .on('data', async (block: BlockHeader) => {
            console.log('block.number', block.number)
            const kyberResult = await Promise.all([
                pollDaiToEth().call(),
                pollEthToDai().call()
            ])
            console.log('kyberResult', kyberResult)
        })
        .on('error', (e: Error) => {
            console.log('e', e)
        })
}