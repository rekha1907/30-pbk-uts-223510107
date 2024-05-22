<template>
    <div class="todospages">
      <div class="cont-input">
        <h1>Reminder</h1>
        <input type="text" v-model="newActivity" placeholder="Waktu Sholat">
        <br><br>
        <input type="text" v-model="newActivitySurat" placeholder="Surat">
        <br><br>
        <input type="date" v-model="newActivityDate">
        <br><br>
        <input type="time" v-model="newActivityTime">
        <br><br>
        <button @click="addOrUpdateActivity">{{ editingIndex === null ? 'Tambah' : 'Perbarui' }}</button>
      </div>
  
      <div class="cont-isi">
        <input type="text" v-model="searchQuery" placeholder="Cari kegiatan...">
        <br><br>
        <div class="dropdown">
          <button class="dropbtn" @click="toggleDropdown">
            Daily Routine <span class="arrow">&#9660;</span>
          </button>
          <div class="dropdown-content" :class="{ 'show': dropdownOpen }">
            <button @click="setFilter('all')" :class="{ 'active': filter === 'all' }">Semua Kegiatan</button>
            <button @click="setFilter('incomplete')" :class="{ 'active': filter === 'incomplete' }">Kegiatan Belum Selesai</button>
            <button @click="setFilter('completed')" :class="{ 'active': filter === 'completed' }">Kegiatan Selesai</button>
          </div>
        </div>
        <br><br>
  
        <table class="activity-table">
          <thead>
            <tr>
              <th>Waktu Sholat</th>
              <th>Surat</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, index) in filteredActivities" :key="index">
              <td>
                <input type="checkbox" v-model="activity.completed">
              <span :class="{ 'completed': activity.completed }">{{ activity.newActivity }}</span>
            </td>
            <td>
              <span :class="{ 'completed': activity.completed }">{{ activity.newActivitySurat }}</span>
            </td>
            <td>
              <span :class="{ 'completed': activity.completed }">{{ activity.newActivityDate }}</span>
            </td>
            <td>
              <span :class="{ 'completed': activity.completed }">{{ activity.newActivityTime }}</span>
            </td>
            <td>
              <span :class="{ 'completed': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
            </td>
            <td>
              <button @click="editActivity(index)" class="edit-button">Edit</button>
              <button @click="cancelActivity(index)" class="cancel-button">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newActivity: '',
      newActivitySurat: '',
      newActivityDate: '',
      newActivityTime: '',
      searchQuery: '',
      filter: 'all',
      editingIndex: null,
      activities: [],
      dropdownOpen: false // Track dropdown menu state
    };
  },
  computed: {
    filteredActivities() {
      let filtered = this.activities;

      // Filter based on search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(activity => {
          return (
            activity.newActivity.toLowerCase().includes(query) ||
            activity.newActivitySurat.toLowerCase().includes(query) ||
            activity.newActivityDate.toLowerCase().includes(query) ||
            activity.newActivityTime.toLowerCase().includes(query)
          );
        });
      }

      // Apply status filter
      if (this.filter === 'incomplete') {
        filtered = filtered.filter(activity => !activity.completed);
      } else if (this.filter === 'completed') {
        filtered = filtered.filter(activity => activity.completed);
      }

      return filtered;
    }
  },
  methods: {
    addOrUpdateActivity() {
      if (this.editingIndex !== null) {
        // Update existing activity
        const editedActivity = {
          newActivity: this.newActivity,
          newActivitySurat: this.newActivitySurat,
          newActivityDate: this.newActivityDate,
          newActivityTime: this.newActivityTime,
          completed: this.activities[this.editingIndex].completed
        };
        this.activities.splice(this.editingIndex, 1, editedActivity);
        this.editingIndex = null; // Reset editing state
      } else {
        // Add new activity
        if (this.newActivity.trim() !== '' && this.newActivitySurat.trim() !== '') {
          this.activities.push({
            newActivity: this.newActivity,
            newActivitySurat: this.newActivitySurat,
            newActivityDate: this.newActivityDate,
            newActivityTime: this.newActivityTime,
            completed: false,
          });
        }
      }

      // Reset form fields
      this.newActivity = '';
      this.newActivitySurat = '';
      this.newActivityDate = '';
      this.newActivityTime = '';
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    setFilter(filter) {
      this.filter = filter;
    },
    editActivity(index) {
      const activity = this.activities[index];
      // Set the form fields to the values of the selected activity for editing
      this.newActivity = activity.newActivity;
      this.newActivitySurat = activity.newActivitySurat;
      this.newActivityDate = activity.newActivityDate;
      this.newActivityTime = activity.newActivityTime;
      this.editingIndex = index; // Set the editing index
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown menu state
    }
  }
};
</script>

<style scoped>
.todospages {
  color: white;
}

.cont-input {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgb(176, 120, 41, 0.697);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cont-isi {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color:  rgba(176, 120, 41, 0.697);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: rgb(198, 152, 112);
  color: white;
  padding: 10px;
  font-size: 13px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover {
  background-color: rgba(178, 109, 53);
}

.dropdown-content {
  display: none;
  position: absolute();
  background-color: white;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  background-color: white;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.active {
  background-color: #ccc;
}

.cancel-button {
  background-color: rgba(151, 89, 35, 0.866);
  margin-left: 10px;
}

.cancel-button:hover {
  background-color: rgba(119, 66, 23, 0.866);
}

.btn-show {
  background-color: rgb(88, 54, 5);
  padding: 15px 15px;
}

.btn-show:hover {
  background-color: rgb(75, 45, 3);
}

.edit-button {
  background-color: rgb(88, 54, 5);
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
}

.edit-button:hover {
  background-color: rgb(75, 45, 3);
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.activity-table th,
.activity-table td {
  padding: 12px;
  border-bottom: 1px solid rgb(0, 0, 0);
  text-align: center;
  background-color: rgb(198, 152, 112);
}

.activity-table th {
    background-color: rgb(178, 109, 53);
}

.activity-table th,
.activity-table td {
  padding: 12px;
  border-bottom: 1px solid rgb(0, 0, 0);
  text-align: center;
  background-color: rgb(198, 152, 112);
}

.activity-table th {
  background-color: rgb(178, 109, 53);
}


</style>
