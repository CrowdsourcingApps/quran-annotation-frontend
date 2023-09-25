<template>
    <v-container>
        <v-row no-gutters>
            <v-col key=1 cols="" sm="3"></v-col>
            <v-col key=2 cols="12" sm="6">
                <v-timeline side="end">
                    <v-timeline-item
                    dot-color="gold"
                    icon="mdi-star-shooting"
                    fill-dot
                >
                        <v-card>
                        <v-card-title :class="['text-h6', `bg-primary`]">
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
                        <v-card-title :class="['text-h6', `bg-primary`]">
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
                        <v-card-title :class="['text-h6', `bg-primary`]">
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
    <Navbar/>
  </template>

<script>
import { useHead } from '@unhead/vue'
import Navbar from '@/components/Navbar.vue';

export default {
    components: {Navbar},
    setup(){
        useHead({
        title: 'Quran Voice - About us',
        meta: [
            {
            name: 'description',
            content: 'What is our goal and how we can achieve it',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/about', // Canonical URL
            }
        ]
        })
    }
}
</script>
<style>
.mdi-star-shooting::before,.mdi-lightbulb-on::before {
    color: white;
}
/* .card-border{
    border-top-style: inset;
    border-bottom-style: inset;
} */
</style>