<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCounterStore } from '~/stores/counter'
const countStore = useCounterStore()

const { incCounter, decCounter } = useCounterStore()
const { count } = storeToRefs(countStore)
</script>

<template>
  <div>
    {{ count }}
    <button class="inc" @click="incCounter()">
      +
    </button>
    <button class="dec" @click="decCounter()">
      -
    </button>
  </div>
</template>
