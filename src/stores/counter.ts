import { ethers } from 'ethers'
import { defineStore } from 'pinia'
import contractABI from '../../out/Counter.sol/Counter.abi.json'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    syncCounter()

    contract.on('UpdateCounter', (x) => {
        count.value = x
    })

    async function syncCounter() {
        try {
            const { ethereum } = window
            if (ethereum) {
                count.value = (await contract.getCounter())
            }
        } catch (e) {
            console.log('e', e)
        }
    }

    async function incCounter() {
        try {
            const { ethereum } = window
            if (ethereum) {
                await contract.incCounter()
            }
        } catch (e) {
            console.log('e', e)
        }
    }
    
    async function decCounter() {
        try {
            const { ethereum } = window
            if (ethereum) {

                await contract.decCounter()
            }
        } catch (e) {
            console.log('e', e)
        }
    }
    async function setCounter(x) {
        try {
            const { ethereum } = window
            if (ethereum) {
                await contract.setCounter(x)
            }
        } catch (e) {
            console.log('e', e)
        }        
    }

    return {
        count,
        syncCounter,
        incCounter,
        decCounter,
        setCounter
    }
})