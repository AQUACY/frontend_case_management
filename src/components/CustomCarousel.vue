<template>
  <div class="carousel-container">
    <div class="announcement-section">
      <q-carousel
        v-if="announcements.length > 0"
        animated
        infinite
        autoplay
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        v-model="currentIndex"
        height="60px"
        class="bg-blue-10 shadow-1 rounded-borders"
      >
        <q-carousel-slide
          v-for="(announcement, index) in announcements"
          :key="index"
          :name="index"
          class="column no-wrap flex-center"
        >
          <div class="q-pa-sm text-center">
            <div class="text-subtitle1 text-white">{{ announcement.title }}</div>
            <div class="text-caption text-white">{{ formatDate(announcement.created_at) }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div v-else class="no-announcements q-pa-md text-center">No announcements available</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    announcements: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.announcements.length
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.announcements.length) % this.announcements.length
    },
    formatDate(date) {
      const d = new Date(date)
      const day = String(d.getDate()).padStart(2, '0') // Ensure two digits for day
      const month = String(d.getMonth() + 1).padStart(2, '0') // Ensure two digits for month (getMonth is 0-indexed)
      const year = d.getFullYear()
      return `${day}/${month}/${year}`
    },
  },
}
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark transparent background */
  margin-top: 20px; /* Space below q-header */
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  display: none;
  justify-content: left;
  align-items: left;
  text-align: left;
}

.carousel-slide.active {
  display: flex;
}

.controls {
  position: absolute;
  margin-top: 20px;
  top: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-10%);
}

button {
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent buttons */
  border: none;
  font-size: 10px;
  cursor: pointer;
  color: white;
  padding: 10px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
}

button:focus {
  outline: none;
}

.content {
  color: white;
}
</style>
