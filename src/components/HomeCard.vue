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

        <v-card-actions>
            <v-btn variant="text" color="info" prepend-icon="mdi-notebook-outline">{{ $t('homepage.instructions') }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn style="background-color:#5FD083; color: #fff;" :prepend-icon="Icon">
                {{ $t('homepage.try_it')  }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
    export default {
        props: ['Title','Icon','Description', 'mdAndUpvalue', 'xsvalue'],
    }
</script>