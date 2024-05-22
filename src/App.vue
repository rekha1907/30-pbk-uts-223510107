<template>
  <div id="app" class="container">
    <div class="menu">
      <button @click="showUserPage" class="btn-user">User</button>
      <button @click="showTodoPage" class="btn-todos">Todo List</button>
    </div>

    <Slot v-if="currentPage === 'user'" menuType="user">
      <Post />
    </Slot>
    <Slot v-else-if="currentPage === 'todo'" menuType="todo">
      <Todos />
    </Slot>
  </div>
</template>

<script>
import Post from './components/Post.vue';
import Todos from './components/Todos.vue';
import Slot from './components/Slot.vue';

export default {
  name: 'App',
  components: {
    Post,
    Todos,
    Slot
  },
  data() {
    return {
      currentPage: 'user'
    };
  },
  methods: {
    showUserPage() {
      this.currentPage = 'user';
    },
    showTodoPage() {
      this.currentPage = 'todo';
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  background-image: url(gmbr2.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0);
}

.btn-user, .btn-todos {
  background-color: rgb(88, 54, 5);
  padding: 15px 15px;
}

.btn-user:hover, .btn-todos:hover {
  background-color: rgb(75, 45, 3);
}

.btn-todos {
  margin-left: 10px;
}
</style>
