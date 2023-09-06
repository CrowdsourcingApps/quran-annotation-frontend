<template>
    <div>
      <p class="notification-title">{{ toastProps?.data.title }}</p>
      <p class="notification-body">{{ toastProps?.data.body }}</p>
      <div style="text-align: left">
        <button class="notification-button" style="direction: ltr;" @click="to()"> هيّا </button>
      </div>
    </div>
</template>

<style>
.notification-title {
  font-size: 18px; /* Font size for the title */
  font-weight: bold; /* Bold font for the title */
}

.notification-body {
  font-size: 16px; /* Font size for the body text */
  margin-bottom: 5px; /* Spacing below the body text */
}

.notification-button {
  background-color: #5FD083; /* Background color for the button */
  color: #fff; /* Text color for the button */
  border: none; /* Remove button border */
  border-radius: 5px; /* Rounded corners for the button */
  padding: 5px 10px; /* Padding inside the button */
  font-size: 16px; /* Font size for the button text */
  cursor: pointer; /* Cursor style on hover */
}

.notification-button:hover {
  background-color: #8ecfa3; /* Background color change on button hover */
}
</style>

<script lang="ts">
import type { ToastOptions } from 'vue3-toastify';
import type { PropType } from 'vue';
export default {
  props:  {
    toastProps: Object as PropType<ToastOptions>,
  },
  methods:{
    to(){
        const link = this.toastProps?.data.link
        window.open(link)
    }
  }
};
</script>