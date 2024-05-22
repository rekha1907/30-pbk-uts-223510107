<template>
    <div class="slot-container">
      <h2 v-if="menuType === 'user'">Tampilan Berisi Post dan User</h2>
      <h2 v-else-if="menuType === 'todo'">Tampilan Berisi List Kegiatan</h2>
      <slot></slot>
    </div>
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
  