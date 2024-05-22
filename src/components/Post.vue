<template>
    <div class="userpages">
      <div class="cont-user">
        <form @submit.prevent="getUserPosts" class="form">
          <label for="userName">Nama User:</label>
          <input type="text" v-model="userName" list="userNames" id="userName" autocomplete="off" @input="selectUser" class="input">
          <datalist id="userNames">
            <option v-for="user in filteredUsers" :key="user.id" :value="user.name"></option>
          </datalist>
          <button type="submit" class="btn-show">Tampilkan Postingan</button>
        </form>
        <!-- List of user posts -->
        <div v-if="selectedUserId && userPosts.length > 0" class="user-post-list">
          <h2>Postingan oleh {{ selectedUserName }}</h2>
          <div v-for="post in userPosts" :key="post.id" class="card">
            <div class="post-card">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        userName: "",
        selectedUserId: null,
        selectedUserName: "",
        userPosts: [],
      };
    },
    computed: {
      filteredUsers() {
        return this.users.filter((user) =>
          user.name.toLowerCase().includes(this.userName.toLowerCase())
        );
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
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`
          );
          this.userPosts = await response.json();
          this.selectedUserName = this.users.find(
            (user) => user.id === parseInt(this.selectedUserId)
          ).name;
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      },
      selectUser() {
        const selectedUser = this.users.find(
          (user) => user.name.toLowerCase() === this.userName.toLowerCase()
        );
        if (selectedUser) {
          this.selectedUserId = selectedUser.id;
          this.selectedUserName = selectedUser.name;
          this.userName = ""; // Clear the input field after selecting a user
          this.getUserPosts();
        } else {
          this.selectedUserId = null;
          this.selectedUserName = "";
          this.userPosts = [];
        }
      },
    },
    created() {
      this.getUsers();
    },
  };
  </script>
  
  <style scoped>
  .userpages {
    color: white;
  }
  
  .cont-user {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(176, 120, 41, 0.697);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .btn-show {
    background-color: rgb(88, 54, 5);
    padding: 15px 15px;
  }
  
  .btn-show:hover {
    background-color: rgb(75, 45, 3);
  }
  
  .post-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: rgba(176, 120, 41, 0.9);
  }
  
  .post-card h3 {
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
  }
  
  .post-card p {
    font-size: 14px;
    color: white;
    line-height: 1.6;
  }
  </style>
  