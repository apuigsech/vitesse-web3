<script setup lang="ts">
import WalletConnect from '../components/WalletConnect.vue'
import {
  MetaMaskConnector,
} from 'vue-dapp'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '~/stores/counter'
const countStore = useCounterStore()
const { incCounter, decCounter } = useCounterStore()
const { count } = storeToRefs(countStore)

let connectors: Connector[] = [
  new MetaMaskConnector({
    appUrl: 'http://localhost:3000',
  }),
]

</script>

<template>
  <vd-board
    :connectors="connectors"
    dark
  >
  </vd-board>  
  <TheCounter />
</template>

<route lang="yaml">
meta:
  layout: default
</route>