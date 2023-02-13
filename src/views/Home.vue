<template>
    <v-container>
        <v-row no-gutters>
            <v-col
            key=1
            cols="12"
            sm="6"
            >
            <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">Contribute to a large open-source Quran dataset</p>
            <p class="text-h6 text-sm-subtitle-1 ma-2 pa-2">This dataset allows to build intelligent AI-based learning apps for Quran</p>
            <div class="d-flex align-center ma-2 pa-2">
                <v-btn color="secondary" style="background-color: black;">Login</v-btn>
                <p class="text-subtitle-1 text-sm-caption ma-2 pa-2">Over 1000 audios are waiting your contribution</p>
            </div>
            </v-col>
            <v-col
                key=2
                cols="12"
                sm="6"
                >
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/isUJXYdhkpg"
                 title="YouTube video player" frameborder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowfullscreen></iframe>
            </v-col>
        </v-row>
        
        <v-row
        no-gutters
        class="ma-4 pa-2"
        >
        <v-col
        key=1
        cols="12"
        sm="4"
        ></v-col>
        <v-col
        key=2
        cols="12"
        sm="4"
        style="text-align: center"
        >
        <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">Contribute</p>
        </v-col>
        <v-col
        key=1
        cols="12"
        sm="4"
        ></v-col>

        </v-row>
        <v-row>
            <v-col
                key=1
                cols="12"
                sm="6"
                >
                <HomeCard  Title="Validate recitation"
                            Icon="mdi-checkbox-marked-circle-outline"
                            Description="Listen to an audio of an ayah, check if it’s recited correctly."
                            :mdAndUpvalue="mdAndUpvalue"
                            :xsvalue="xsvalue"/>
            </v-col>
            <v-col
                key=2
                cols="12"
                sm="6"
                >
                <HomeCard  Title="Transcribe recitation"
                           Icon="mdi-feather"
                           Description="Type exactly what you hear including the mistakes."
                           :mdAndUpvalue="mdAndUpvalue"
                           :xsvalue="xsvalue"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                key=1
                cols="12"
                sm="6"
                >
                <HomeCard  Title="Validate transcription"
                            Icon="mdi-text-box-search-outline"
                            Description="Check if a transcription by another participant is correct."
                            :mdAndUpvalue="mdAndUpvalue"
                            :xsvalue="xsvalue"/>
            </v-col>
            <v-col
                key=2
                cols="12"
                sm="6"
                >
                <HomeCardComming  Title="Validate Tajweed"
                           Icon="mdi-magnify"
                           Description="Check if Tajweed rules are applied correctly or not."
                           :mdAndUpvalue="mdAndUpvalue"
                           :xsvalue="xsvalue"/>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
    import HomeCard from '@/components/HomeCard.vue'
    import HomeCardComming from '@/components/HomeCardComming.vue'
    import { useDisplay } from 'vuetify'

    export default {
        components: {HomeCard, HomeCardComming},
        setup () {
        // Destructure only the keys we want to use
        const { xs, mdAndUp } = useDisplay()
        var mdAndUpvalue = mdAndUp.value
        var xsvalue = xs.value
        return { mdAndUpvalue,xsvalue }
        }
    }
</script>