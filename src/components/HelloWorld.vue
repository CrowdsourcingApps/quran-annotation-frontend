<template>
    <!-- <div class="text-center">
      <v-select
        v-model="location"
        :items="locations"
        label="Location"
      ></v-select>
      <v-menu :location="location">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            dark
            v-bind="props"
          >
            Dropdown
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div> -->
  </template>

  <!-- <template>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          sm="4"
        >
          <v-sheet class="ma-2 pa-2">
            One of three columns
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template> -->

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
    locations: [
      'top',
      'bottom',
      'start',
      'end',
      'center',
    ],
    location: 'end',
  }),
}
</script>