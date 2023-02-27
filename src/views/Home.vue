<template>
    <v-container>
        <v-row no-gutters>
            <v-col
            key=1
            cols="12"
            sm="6"
            >
            <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">{{ $t('homepage.goal') }}</p>
            <p class="text-h6 text-sm-subtitle-1 ma-2 pa-2">{{ $t('homepage.AI') }}</p>
            <div class="d-flex align-center ma-2 pa-2">
                <v-btn color="secondary" style="background-color: black;">{{ $t('nav.login') }}</v-btn>
                <p class="text-subtitle-1 text-sm-caption ma-2 pa-2">{{ $t('homepage.statistics') }}</p>
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
        
        <v-row id="contribute_section">
            <v-col cols="12" style="text-align: center;margin-top:40px !important">
                <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">{{ $t('homepage.contribute') }}</p>
            </v-col>
            <v-col
                key=1
                cols="12"
                sm="6"
                >
                <HomeCard  :Title="$t('homepage.validate_recitation')"
                           Icon="mdi-checkbox-marked-circle-outline"
                           :Description="$t('homepage.validate_recitation_description')"
                           :mdAndUpvalue="mdAndUpvalue"
                           InsLink="/instructions/vc"
                           :Link="vclink"
                           :xsvalue="xsvalue"/>
            </v-col>
            <v-col
                key=2
                cols="12"
                sm="6"
                >
                <HomeCardComming  :Title="$t('homepage.transcribe_recitation')"
                                  Icon="mdi-feather"
                                  :Description="$t('homepage.transcribe_recitation_description')"
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
                <HomeCardComming  :Title="$t('homepage.validate_transcription')"
                            Icon="mdi-text-box-search-outline"
                            :Description="$t('homepage.validate_transcription_description')"
                            :mdAndUpvalue="mdAndUpvalue"
                            :xsvalue="xsvalue"/>
            </v-col>
            <v-col
                key=2
                cols="12"
                sm="6"
                >
                <HomeCardComming  :Title="$t('homepage.validate_Tajweed')"
                           Icon="mdi-magnify"
                           :Description="$t('homepage.validate_Tajweed_description')"
                           :mdAndUpvalue="mdAndUpvalue"
                           :xsvalue="xsvalue"/>
            </v-col>
        </v-row>
        <v-row style="height:200px"></v-row>
    </v-container>
</template>
  
<script lang="ts">
    import HomeCard from '@/components/HomeCard.vue'
    import HomeCardComming from '@/components/HomeCardComming.vue'
    import UserInfoService from "@/services/userinfo.service";
    import AuthService from "@/services/auth.service";
    import { useDisplay } from 'vuetify'

    export default {
        components: {HomeCard, HomeCardComming},
        data: () =>({
            vclink: "/instructions/vc"
        }),
        setup () 
        {
            // get screen size values
            // Destructure only the keys we want to use
            const { xs, mdAndUp } = useDisplay()
            var mdAndUpvalue = mdAndUp.value
            var xsvalue = xs.value
            return { mdAndUpvalue,xsvalue}
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
        },
        created() {
            if (this.loggedIn) {
                // get user info
                var vcvisited = UserInfoService.getVisitVCInstructions()
                if(vcvisited === undefined) {
                    // call user service
                    AuthService.getme().then(
                    (response) => {
                        var data = response.data
                        if(data.validate_correctness_exam_pass === false){
                            data.vc_Instructions = false
                            vcvisited = false
                            this.vclink = "/instructions/vc"
                        } else {
                            data.vc_Instructions = true
                            vcvisited = true
                            this.vclink = "/task/vc"
                        }
                        UserInfoService.setUserInfo(data)
                    },
                    (error) => {
                        console.log(error);
                    }
                    );
                }
                else{
                    if(vcvisited === false) {
                    this.vclink = "/instructions/vc"
                    }
                    else {
                        // visited true
                        var vcpass = UserInfoService.getValidateCorrectnessResult()
                        if(vcpass){
                            this.vclink = "/task/vc"
                        }
                        else{
                            this.vclink = "/train/vc"
                        }
                    }
                }  
                
            }
        },
    }
</script>