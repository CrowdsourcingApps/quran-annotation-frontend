<template>
    <v-card
        class="mx-auto ma-2 pa-2"
        :max-width="xsvalue? '100%' : mdAndUpvalue ? '60%' : '80%'"
        style="background-color: #F5F5F5;"
        >
        <v-card-item>
        <div>
            <div class="text-h6 mb-1">
                {{ Title }} <v-icon>{{ Icon }}</v-icon>
            </div>
            <div class="text-caption ma-2">{{ Description }}</div>
        </div>
        </v-card-item>

        <v-card-subtitle class="ma-2 pa-2">
        <span class="ml-2">{{ $t('homepage.coming_soon') }}</span>
        <v-icon
          icon="mdi-sprout-outline"
        ></v-icon>
      </v-card-subtitle>
    </v-card>

</template>
<script lang="ts">
    export default {
        props: ['Title','Icon','Description', 'mdAndUpvalue', 'xsvalue'],
    }
</script>