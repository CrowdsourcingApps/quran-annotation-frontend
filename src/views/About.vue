<template>
    <v-container>
        <v-row no-gutters>
            <v-col key=1 cols="" sm="3"></v-col>
            <v-col key=2 cols="12" sm="6">
                <v-timeline side="end">
                    <v-timeline-item
                    dot-color="yellow-darken-1"
                    icon="mdi-star-shooting"
                    fill-dot
                >
                        <v-card>
                        <v-card-title style="color: white !important;" :class="['text-h6', `bg-yellow-darken-1`]">
                            {{ $t('about.goal') }}
                        </v-card-title>
                        <v-card-text class="bg-white text--primary ma-2">
                            <p>{{ $t('about.goal_sentence') }}</p>
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                    dot-color="success"
                    icon="mdi-lightbulb-on"
                    fill-dot
                >
                        <v-card>
                        <v-card-title style="color: white !important;" :class="['text-h6', `bg-success`]">
                            {{ $t('about.how') }}
                        </v-card-title>
                        <v-card-text class="bg-white text--primary ma-2">
                            <p>{{ $t('about.how_sentence') }}</p>
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>
                    <v-timeline-item
                    dot-color="blue"
                    icon="mdi-human-greeting"
                    fill-dot
                >
                        <v-card>
                        <v-card-title :class="['text-h6', `bg-blue`]">
                            {{ $t('about.who') }}
                        </v-card-title>
                        <v-card-text class="bg-white text--primary ma-2">
                            <p>{{ $t('about.who_sentence') }}</p>
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
            <v-col key=3 cols="" sm="3"></v-col>
        </v-row>
    </v-container>
  </template>
<script>
</script>
<style>
.mdi-star-shooting::before,.mdi-lightbulb-on::before {
    color: white;
}
</style>