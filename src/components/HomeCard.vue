<template>
    <v-card
        class="mx-auto ma-2 pa-2"
        :max-width="xsvalue? '100%' : mdAndUpvalue ? '70%' : '80%'"
        style="background-color: #F5F5F5;text-align: center"
        >
        <v-card-item>
        <div>
            <div class="text-h6 mb-1">
                {{ Title }} <v-icon>{{ Icon }}</v-icon>
            </div>
            <div class="text-caption ma-2">{{ Description }}<b>{{ focus }}</b> {{ ruaya }} <b>{{ hafs }}</b></div>
            <ProgressBar :vc_target="vc_target"
                        :vc_progress="vc_progress"/>
        </div>
        </v-card-item>

        <v-card-actions>
            <v-btn variant="outlined" color="info" prepend-icon="mdi-notebook-outline" @click="toInstructions()">
                {{ $t('homepage.instructions') }}
            </v-btn>
            <!-- <v-btn style="background-color:#5eaae7; color: #fff;" prepend-icon="mdi-notebook-outline" :to="InsLink">
                {{ $t('homepage.instructions') }}
            </v-btn> -->
            <!-- <v-btn variant="text" color="info" prepend-icon="mdi-notebook-outline"  :to="InsLink">{{ $t('homepage.instructions') }}</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn style="background-color:#5FD083; color: #fff;" :prepend-icon="Icon" @click="toTry()">
                {{ $t('homepage.try_it')  }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
    import amplitude from '@/amplitude/index.js'
    import ProgressBar from '@/components/ProgressBar.vue'
    export default {
        components: {ProgressBar},
        props: ['Title','Icon','Description','focus','ruaya','hafs', 'mdAndUpvalue', 'xsvalue','InsLink', 'Link','vc_target','vc_progress', 'loggedIn'],
        methods:{
            toInstructions() {
                if(this.InsLink ==="/instructions/vc"){
                    const eventProperties = {
                        location: 'Home',
                    };
                    amplitude.track('VCInstructions Clicked', eventProperties);
                } 
                this.$router.push(this.InsLink);
            },
            toTry(){
                if(this.Link.includes('vc')){
                    const eventProperties = {
                        location: 'Home',
                    };
                    amplitude.track('VCTry Clicked', eventProperties);
                } 
                this.$router.push(this.Link);
            }
        }
    }
</script>