<template>
  <q-item
    clickable
    tag="router-link"
    :to="props.link"
    class="nav-item"
    :class="{ active: $route.path === props.link }"
  >
    <q-item-section>
      <span class="nav-text" :class="{ 'text-bold': $route.path === props.link }">
        {{ props.title }}
      </span>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.nav-item {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, $green, $green);
    transition: left 0.3s ease;
    z-index: 0;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    .q-icon {
      color: white !important;
      transition: color 0.3s ease;
    }
    .nav-text {
      color: white !important;
      transition: color 0.3s ease;
    }
  }

  // Ensure content stays above the hover effect
  .q-item__section {
    position: relative;
    z-index: 1;
  }

  .q-icon {
    color: $green !important;
    transition: color 0.3s ease;
  }

  .nav-text {
    color: $green !important;
    transition: color 0.3s ease;
  }
  .nav-item:active {
    background-color: $green;
  }

  // Active state styling
  &.q-router-link-active {
    background: $green !important;

    &::before {
      left: 0;
      background: linear-gradient(to right, $green, $green);
    }

    .q-item__section {
      color: white !important;
    }

    .q-icon,
    .nav-text {
      color: white !important;
      font-weight: bold;
    }
  }
}
</style>
