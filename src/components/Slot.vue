<template>
  <q-page class="q-pa-md">
    <div class="slot-container">
      <q-banner v-if="menuType === 'user'" class="q-mb-md">
        Tampilan Berisi Post dan User
      </q-banner>
      <q-banner v-else-if="menuType === 'todo'" class="q-mb-md">
        Tampilan Berisi List Kegiatan
      </q-banner>
      <slot></slot>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Slot',
  props: {
    menuType: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>