<template>
  <q-page>
    <q-form @submit.prevent="fetchAlbumPhotos" class="q-gutter-md">
      <q-input v-model="albumId" label="Enter Album ID" type="number" outlined />
      <q-btn type="submit" label="Lihat Foto" class="bg" />
    </q-form>

    <q-card v-if="loading" class="q-mt-md">
      <q-spinner-dots size="30px" color="primary" />
    </q-card>

    <q-card v-else-if="photos.length > 0" class="bg-transparent">
      <q-card-section class="q-mt-md">
        <div class="photo-list">
          <q-card v-for="photo in photos" :key="photo.id" class="photo-card bg-transparent">
            <q-img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail" />
            <q-card-section>
              <q-item-label lines="2">{{ photo.title }}</q-item-label>
              <q-item-label caption style="word-break: break-all;">
                <a :href="photo.url" target="_blank">{{ photo.url }}</a>
              </q-item-label>
            </q-card-section>
            <q-card-section>
              <q-btn label="View" class="bg" @click="viewPhotoDetail(photo)" />
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>

    <q-banner v-else class="q-mt-md banner">
      Silahkan pilih album id yang ingin dilihat
    </q-banner>

    <q-dialog v-model="dialogVisible" class="photo-dialog">
      <q-card style="max-width: 100vw; max-height: 100vh;">
        <q-card-section>
          <q-img :src="selectedPhoto.url" :alt="selectedPhoto.title" class="dialog-photo" />
        </q-card-section>
        <q-card-section>
          <q-item-label>{{ selectedPhoto.title }}</q-item-label>
          <q-item-label caption style="word-break: break-all;">
            <a :href="selectedPhoto.url" target="_blank">{{ selectedPhoto.url }}</a>
          </q-item-label>
        </q-card-section>
        <q-card-section>
          <q-btn label="Close" color="primary" @click="closeDialog" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'Albums',
  data() {
    return {
      albumId: '',
      photos: [],
      loading: false,
      selectedPhoto: {},
      dialogVisible: false,
    };
  },
  methods: {
    async fetchAlbumPhotos() {
      if (!this.albumId) return;

      this.loading = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.albumId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        this.photos = json.map(photo => ({
          ...photo,
          title: photo.title,
          thumbnailUrl: photo.thumbnailUrl,
          url: photo.url
        }));
        this.loading = false;
        
        this.$router.push({ path: `/albums/${this.albumId}` });
      } catch (error) {
        console.error('Error fetching photos by album ID:', error);
        this.loading = false;
        this.photos = [];
      }
    },
    viewPhotoDetail(photo) {
      this.selectedPhoto = photo;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  },
  watch: {
    $route(to) {
      const { id } = to.params;
      if (id) {
        this.albumId = id;
        this.fetchAlbumPhotos();
      }
    }
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      this.albumId = id;
      this.fetchAlbumPhotos();
    }
  },
};
</script>

<style scoped>
.photo-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.photo-card {
  margin: 10px;
  cursor: pointer;
  width: 200px;
}

.photo-thumbnail {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.dialog-photo {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.photo-dialog {
  max-width: 90vw;
  width: auto;
}

.banner {
  background-color: rgba(255, 255, 255, 0);
}

</style>
