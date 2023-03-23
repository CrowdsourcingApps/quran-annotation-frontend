<template>
    <v-card class="mx-auto" style="text-align: center;">
    <v-card-text class="ma-2 pa-2">
        {{ $t('trainning.listen')  }} 
    </v-card-text>
        <v-btn @click="playAudio(audioFileName)"
                class="mr-3"
                variant="outlined"
                color="black"
                icon="mdi-play"
                v-if="!loading"
            ></v-btn>
        <v-progress-circular v-if="loading" model-value="20"></v-progress-circular>
        <v-card-text class="ma-2 pa-2">
            {{ $t('trainning.recited_correctly')  }} 
        </v-card-text> 
        <v-card-text style="line-height: 2.25rem;" class="ma-2 pa-2 text-h5">{{ quran[surra_number][aya_number]['uthmani'] }}</v-card-text>
        <v-card-subtitle v-if="problem" class="ma-2 pa-2">
            {{ $t('trainning.what_problem') }}
        </v-card-subtitle>
        <div v-if="!problem" style="display: inline-grid;">
            <v-btn :disabled="correct" color="success" style="margin: 10px; color: #fff !important;">
                {{ $t('trainning.correct') }}
            </v-btn>
            <v-btn :disabled="incorrect" color="fail" style="margin: 10px; color: #fff !important;">
                {{ $t('trainning.incorrect') }}
            </v-btn>
            <v-btn :disabled="has_prob" color="invalid" style="margin: 10px;">
                {{ $t('trainning.problem') }}
            </v-btn>
        </div>
        <div v-if="problem" style="display: inline-grid;">
            <v-btn :disabled="incomplete" variant="outlined" color="invalidoption" style="margin: 10px">
                {{ $t('trainning.incomplete') }}
            </v-btn>
            <v-btn :disabled="different" variant="outlined" color="invalidoption" style="margin: 10px">
                {{ $t('trainning.different') }}
            </v-btn>
            <v-btn :disabled="multiple" variant="outlined" color="invalidoption" style="margin: 10px">
                {{ $t('trainning.multiple') }}
            </v-btn>
            <v-btn :disabled="empty" variant="outlined" color="invalidoption" style="margin: 10px">
                {{ $t('trainning.empty') }}
            </v-btn>
            <v-btn disabled color="invalid" style="margin: 10px;">
                {{ $t('trainning.back') }}
            </v-btn>
        </div>
    </v-card>
</template>
<script>
 import quran from "@/Quran.json"
 export default {
        props: ['problem','audioFileName','surra_number','aya_number',
                'correct','incorrect','has_prob','empty','different',
                'multiple','audio','incomplete'],
        data: () => ({
            quran: quran,
            loading: false,
        }),
        methods:{
            playAudio(audioFileName) {
                this.loading = true;
                this.audio.src = 'https://miniodev.quranvoice.live/ayat-audio-bucket-dev/' + audioFileName;
                this.audio.play();
                this.loading = false;
            }
        }
    }
</script>