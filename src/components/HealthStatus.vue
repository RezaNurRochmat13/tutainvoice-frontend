<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHealth } from '../api/health';

const status = ref<'loading' | 'ok' | 'down'>('loading');

onMounted(async () => {
  try {
    const res = await getHealth();
    status.value = res.status === 'ok' ? 'ok' : 'down';
  } catch {
    status.value = 'down';
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Tuta Invoice</h1>
      <p v-if="status === 'loading'" class="mt-2 text-gray-500">Checking backend…</p>
      <p v-else-if="status === 'ok'" class="mt-2 text-green-600">Backend: OK</p>
      <p v-else class="mt-2 text-red-600">Backend: DOWN</p>
    </div>
  </div>
</template>
