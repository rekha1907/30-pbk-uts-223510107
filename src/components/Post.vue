<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="getUserPosts" class="q-gutter-md">
      <q-select
        v-model="selectedUserId"
        :options="filteredUsers.map(user => ({label: user.name, value: user.id}))"
        label="Pilih Pengguna"
        emit-value
        map-options
        outlined
      />
      <q-btn type="submit" label="Tampilkan Postingan" class="bg" />
    </q-form>

    <q-input
      v-model="searchText"
      @input="filterPosts"
      label="Cari Postingan"
      outlined
      dense
      clearable
      class="q-mt-md"
    />

    <q-list v-if="selectedUserId && filteredPosts.length > 0" class="q-mt-md">
      <q-item-label>Postingan oleh {{ selectedUserName }}</q-item-label>
      <q-separator spaced />
      <q-item v-for="(post, index) in filteredPosts" :key="post.id">
        <q-item-section>
          <q-item-label><strong>{{ index + 1 }}. {{ post.title }}</strong></q-item-label>
          <q-item-label>{{ post.body }}</q-item-label>
          <q-separator spaced v-if="index < filteredPosts.length - 1" />
        </q-item-section>
        <q-separator spaced v-if="index === filteredPosts.length - 1" />
      </q-item>
    </q-list>

    <q-banner v-else-if="selectedUserId !== null && filteredPosts.length === 0" class="q-mt-md banner">
      Silahkan menekan tombol tampilkan pengguna
    </q-banner>

    <q-banner v-else-if="selectedUserId === null" class="q-mt-md banner">
      Pilih pengguna untuk menampilkan postingannya
    </q-banner>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      selectedUserName: "",
      userPosts: [],
      searchText: "",
    };
  },
  computed: {
    filteredUsers() {
      return this.users;
    },
    filteredPosts() {
      if (!this.searchText.trim()) {
        return this.userPosts;
      }
      const search = this.searchText.trim().toLowerCase();
      return this.userPosts.filter(post => {
        return post.title.toLowerCase().includes(search) ||
               post.body.toLowerCase().includes(search);
      });
    },
  },
  methods: {
    async getUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        this.users = await response.json();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async getUserPosts() {
      try {
        if (this.selectedUserId !== null) {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`
          );
          this.userPosts = await response.json();
          this.selectedUserName = this.users.find(
            (user) => user.id === parseInt(this.selectedUserId)
          ).name;
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    },
    filterPosts() {
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.banner {
  background-color: rgba(255, 255, 255, 0);
}
</style>