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
      <button @click="showAll" class="btn-all">Semua Kegiatan</button>
        <button @click="showIncomplete" class="btn-incompt">Kegiatan Belum Selesai</button>
        <button @click="showCompleted" class="btn-compt">Kegiatan Selesai</button>
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
        filter: 'all'
      };
    },
    computed: {
      filteredActivities() {
        if (this.filter === 'incomplete') {
          return this.activities.filter(activity => !activity.completed);
        } else if (this.filter === 'completed') {
          return this.activities.filter(activity => activity.completed);
        } else {
          return this.activities;
        }
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
      showAll() {
        this.filter = 'all';
      },
      showIncomplete() {
        this.filter = 'incomplete';
      },
      showCompleted() {
        this.filter = 'completed';
      }
    }
  };
</script>
