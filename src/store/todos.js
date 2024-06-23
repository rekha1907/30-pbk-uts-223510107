import { defineStore } from 'pinia';

export const useTodosStore = defineStore({
  id: 'todos',
  state: () => ({
    activities: [
    ],
  }),
  actions: {
    addActivity(activity) {
      this.activities.push(activity);
    },
    removeActivity(activity) {
      const index = this.activities.indexOf(activity);
      if (index !== -1) {
        this.activities.splice(index, 1);
      }
    },
    updateActivity({ index, activity }) {
      if (index >= 0 && index < this.activities.length) {
        this.activities.splice(index, 1, activity);
      }
    },
    toggleActivityCompletion(index) {
      if (index >= 0 && index < this.activities.length) {
        this.activities[index].completed = !this.activities[index].completed;
      }
    },
  },
});
