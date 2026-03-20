<template>
  <login/>
</template>

<script lang="ts">
import Login from '@/components/login.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Login
  }
})
</script>