<template>
  <q-layout>
    <q-header elevated class="bg">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Menu</q-toolbar-title>
        <q-toolbar-title>Reminder</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="400"
      bordered
      style="z-index: 1500;"
      class="bg"
    >

      <q-img class="absolute-top" src="./assets/drawer.jpg" style="height: 150px">
        <div class="absolute-bottom bg-transparent q-pa-sm">
          <q-avatar size="56px" class="q-mb-sm center">
            <img src="./assets/avatar.jpg">
          </q-avatar>
          <div class="text-weight-bold">Rekha Widya Andini</div>
          <div>223510107</div>
        </div>
      </q-img>

      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" style="margin-top: 150px;">
        <q-list padding>
          <q-item clickable v-ripple @click="navigateTo('/post')">
            <q-item-section avatar>
              <q-icon name="email" />
            </q-item-section>
            <q-item-section>
              Post
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="navigateTo('/todos')">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              Todos
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="navigateTo('/albums')">
            <q-item-section avatar>
              <q-icon name="image" />
            </q-item-section>
            <q-item-section>
              Albums
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: true, 
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.drawer = false; 
    }
  }
};
</script>

<style>
.bg {
  background-color: rgb(168, 147, 70);
}

.center {
  margin: 0 auto;
  display: block;
}
</style>
