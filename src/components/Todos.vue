<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <q-input v-model="newActivity" label="Waktu Sholat" outlined dense />
      <q-input v-model="newActivitySurat" label="Surat" outlined dense />
      <div class="q-d-flex justify-between">
        <q-input v-model="newActivityDate" type="date" label="Tanggal" outlined dense />
        <q-input v-model="newActivityTime" type="time" label="Jam" outlined dense />
      </div>

      <q-btn @click="addOrUpdateActivity"
        :label="editingIndex === null ? 'Tambah' : 'Perbarui'"
         class="q-mt-md bg" />
    </div>

    <q-input v-model="searchQuery" label="Cari kegiatan..." outlined dense class="q-mt-md" />
    <q-select v-model="filter" :options="['all', 'incomplete', 'completed']"
      label="Filter" outlined dense class="q-mt-md" />

    <div class="q-mt-md">
      <q-card v-for="(activity, index) in filteredActivities" :key="index" class="q-mb-md bglist">
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label :class="{ 'completed-text': activity.completed }">
                <strong>Waktu Sholat:</strong> <span>{{ activity.newActivity }}</span>
              </q-item-label>
              <q-item-label :class="{ 'completed-text': activity.completed }">
                <strong>Surat:</strong> <span>{{ activity.newActivitySurat }}</span>
              </q-item-label>
              <q-item-label :class="{ 'completed-text': activity.completed }">
                <strong>Tanggal:</strong> <span>{{ activity.newActivityDate }}</span>
              </q-item-label>
              <q-item-label :class="{ 'completed-text': activity.completed }">
                <strong>Jam:</strong> <span>{{ activity.newActivityTime }}</span>
              </q-item-label>
              <q-item-label>
                <strong>Status:</strong> {{ activity.completed ? 'Selesai' : 'Belum Selesai' }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-checkbox v-model="activity.completed" color="negative"
                @input="updateCompletion(activity)" />
              <q-btn icon="edit" @click="editActivity(index)" color="primary" />
              <q-btn icon="delete" color="negative" @click="cancelActivity(activity)" />
            </q-item-section>
          </q-item>

          <div v-if="editingIndex === index" class="q-mt-sm">
            <q-input v-model="activity.newActivity" label="Waktu Sholat" outlined dense />
            <q-input v-model="activity.newActivitySurat" label="Surat" outlined dense />
            <div class="q-d-flex justify-between">
              <q-input v-model="activity.newActivityDate" type="date" label="Tanggal" outlined dense />
              <q-input v-model="activity.newActivityTime" type="time" label="Jam" outlined dense />
            </div>
            <div class="q-mt-sm q-d-flex justify-end">
              <q-btn @click="cancelEdit" label="Batal" color="negative" />
              <q-btn @click="addOrUpdateActivity" label="Perbarui" color="primary" class="q-ml-sm" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useTodosStore } from '../store/todos';

export default defineComponent({
  name: 'Todos',
  setup() {
    const store = useTodosStore();
    const newActivity = ref('');
    const newActivitySurat = ref('');
    const newActivityDate = ref('');
    const newActivityTime = ref('');
    const editingIndex = ref(null);
    const searchQuery = ref('');
    const filter = ref('all');
    const activities = computed(() => store.activities);
    const filteredActivities = computed(() => {
      let filtered = activities.value;

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(activity => {
          return (
            activity.newActivity.toLowerCase().includes(query) ||
            activity.newActivitySurat.toLowerCase().includes(query) ||
            activity.newActivityDate.toLowerCase().includes(query) ||
            activity.newActivityTime.toLowerCase().includes(query)
          );
        });
      }

      if (filter.value === 'incomplete') {
        filtered = filtered.filter(activity => !activity.completed);
      } else if (filter.value === 'completed') {
        filtered = filtered.filter(activity => activity.completed);
      }

      return filtered;
    });

    const addOrUpdateActivity = () => {
      if (editingIndex.value !== null) {
        const editedActivity = {
          newActivity: newActivity.value,
          newActivitySurat: newActivitySurat.value,
          newActivityDate: newActivityDate.value,
          newActivityTime: newActivityTime.value,
          completed: activities.value[editingIndex.value].completed,
        };

        activities.value.splice(editingIndex.value, 1, editedActivity);
        editingIndex.value = null;
      } else {
        if (newActivity.value.trim() !== '' && newActivitySurat.value.trim() !== '') {
          activities.value.push({
            newActivity: newActivity.value,
            newActivitySurat: newActivitySurat.value,
            newActivityDate: newActivityDate.value,
            newActivityTime: newActivityTime.value,
            completed: false,
          });
        }
      }

      newActivity.value = '';
      newActivitySurat.value = '';
      newActivityDate.value = '';
      newActivityTime.value = '';
    };

    const cancelEdit = () => {
      editingIndex.value = null;
    };

    const cancelActivity = (activity) => {
      const index = activities.value.indexOf(activity);
      if (index !== -1) {
        activities.value.splice(index, 1);
      }
    };

    const editActivity = (index) => {
      const activity = activities.value[index];
      newActivity.value = activity.newActivity;
      newActivitySurat.value = activity.newActivitySurat;
      newActivityDate.value = activity.newActivityDate;
      newActivityTime.value = activity.newActivityTime;
      editingIndex.value = index;
    };

    const updateCompletion = (activity) => {
      const index = activities.value.indexOf(activity);
      if (index !== -1) {
        activities.value[index].completed = !activities.value[index].completed;
      }
    };

    return {
      newActivity,
      newActivitySurat,
      newActivityDate,
      newActivityTime,
      editingIndex,
      searchQuery,
      filter,
      filteredActivities,
      addOrUpdateActivity,
      cancelActivity,
      editActivity,
      cancelEdit,
      updateCompletion,
    };
  },
});
</script>

<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.q-card-section {
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.q-btn {
  min-width: auto;
}

.completed-text {
  text-decoration: line-through;
  color: red;
}

.q-item-label span {
  text-decoration: line-through;
  color: red;
}

.bglist{
  background-color: rgba(188, 164, 79, 0.9);
}
</style>
