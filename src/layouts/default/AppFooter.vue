<template>
    <v-footer app bottom color="primary">
        <v-row
        justify="center"
        class="text-center sulotion"
      >
        <v-col key="1" cols="12" sm="4"></v-col>
        <v-col key="2" cols="12" sm="4"
          class="align-center"
          >
          <p>Help us find other contributes</p>
          <v-btn
            v-for="icon in icons"
            :icon="icon"
            size="small"
            class="ma-2"
          >
          </v-btn>
          <p class="text-caption">Content are available under MIT license</p>
        </v-col>
        <v-col key="3" cols="12" sm="4"></v-col
        >
      </v-row>
    </v-footer>
  </template>
<script lang="ts">
export default {
  data: () => {
    return {
      icons: [
        'mdi-link-variant',
        'mdi-facebook',
        'mdi-twitter',
      ],
    };
  },
};
</script>
