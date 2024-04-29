<template>
  <div class="container">
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
      <button @click="addActivity">Tambah</button>
    </div>
    
  
    <div class="cont-isi">
      <input type="text" v-model="searchQuery" placeholder="Cari kegiatan..."> 
      <br><br>
        <div class="dropdown">
          <button class="dropbtn" @click="toggleDropdown">
            Daily Routine <span class="arrow">&#9660;</span>
          </button>
          <div class="dropdown-content">
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
                <span :class="{ 'selesai': activity.completed }">{{ activity.newActivityDate }}</span>
              </td>
              <td>
                <span :class="{ 'selesai': activity.completed }">{{ activity.newActivityTime }}</span>
              </td>
              <td>
                <span :class="{ 'selesai': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
              </td>
              <td>
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
      activities: [],
      newActivity: '',
      newActivitySurat: '',
      newActivityDate: '',
      newActivityTime: '',
      searchQuery: '',
      filter: 'all'
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
    addActivity() {
      if (this.newActivity.trim() !== '' && this.newActivitySurat.trim() !== '') {
        this.activities.push({
          newActivity: this.newActivity,
          newActivitySurat: this.newActivitySurat,
          newActivityDate: this.newActivityDate,
          newActivityTime: this.newActivityTime,
          completed: false,
        });
        this.newActivity = '';
        this.newActivitySurat = '';
        this.newActivityDate = '';
        this.newActivityTime = '';
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    setFilter(filter) {
      this.filter = filter;
    }
  }
};
</script>
