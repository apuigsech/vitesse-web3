import { VueDapp } from "vue-dapp"
import { ethers } from 'ethers'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
    app.use(VueDapp, {
        connectTimeout: 5000,
        autoConnect: true,
        dumb: false,
        networks: {
            31337: {
                chainId: ethers.utils.hexValue(31337),
                blockExplorerUrls: [],
                chainName: 'Develop',
                rpcUrls: ['http://127.0.0.1:8545/'],
                nativeCurrency: {
                    name: 'Dev',
                    decimals: 18,
                    symbol: 'DEV',
                }
            }
        }
    })
}
