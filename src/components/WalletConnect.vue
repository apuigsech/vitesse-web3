<script setup lang="ts">
import {
  useBoard,
  useEthers,
  useWallet,
  useEthersHooks,
  shortenAddress,
  SafeConnector,
  MetaMaskConnector,
  Connector,
} from 'vue-dapp'

import { onBeforeMount, ref, watch } from 'vue'

const props: Props = defineProps({
  connectors: {
    type: Array as () => Connector[],
    required: true,
  },
});

const { open } = useBoard()
const { wallet, disconnect } = useWallet()
const { address, network, isActivated } = useEthers()

onBeforeMount(async () => {
  const safe = new SafeConnector()
  try {
    if (await safe.isSafeApp()) {
      const connectors = [safe]
    }
  } catch (err: any) {
    console.error(err)
  }
})

const dropdown = ref(false)

const { availableNetworks } = useEthers()
delete availableNetworks.value[1]
delete availableNetworks.value[5]

const currentNetwork = network

const { onActivated, onChanged } = useEthersHooks()

onActivated(() => {
  currentNetwork.value = network.value
})

onChanged(() => {
  currentNetwork.value = network.value
})

const switchNetwork = (network: number | string | object | undefined) => {
  if (wallet.connector) {
    wallet.connector.switchChain!(network.chainId)
  }  
}
</script>

<template>
  <div class="inline-flex rounded-md shadow-sm">
    <button
      type="button"
      class="inline-flex rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
      @click="isActivated ? true : open()"
      :disabled="wallet.status === 'connecting'"
    >
      <template v-if="wallet.status === 'connected'">
            {{ shortenAddress(address) }}
      </template>

      <template v-else-if="wallet.status === 'connecting'">
        Connecting...
      </template>

      <template v-else-if="wallet.status === 'loading'">
        Loading...
      </template>

      <template v-else>
        Connect
      </template>
    </button>

    <template v-if="wallet.status === 'connected'">
      <button
        v-if="Object.keys(availableNetworks).length > 1"
        type="button"
        class="inline-flex bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
        @click="() => (dropdown = !dropdown)"
        v-click-outside="() => (dropdown = false)"
      >
      {{  currentNetwork.name }}

        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
        type="button"
        class="inline-flex rounded-r bg-red px-2 pb-2 pt-2.5 text-xs font-medium uppercase"
        @click="disconnect()"
      >X</button>
    </template>
  </div>

  <ul v-if="wallet.status === 'connected' && dropdown" v-for="(network, i) in availableNetworks" class="block bg-transparent px-4 py-2 text-sm font-normal">
    <li>
      <div @click="switchNetwork(network)" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        {{  network.chainName }}
      </div>
    </li>
  </ul>
  <vd-board
    :connectors="connectors"
    dark
  >
  </vd-board>
</template>
