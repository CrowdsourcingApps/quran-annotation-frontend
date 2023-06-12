<template>
    <v-container>
        <div v-if="loggedIn" style="text-align: center">
            <p class="font-weight-bold text-h4 text-sm-h5">{{ $t('nav.mycontribution') }}</p>
        </div>
        <v-row v-if="loggedIn" id="my_contribute_section" ref="my_contribute_section" style="margin-top:-30px !important">
            <v-col key=1 cols="" sm="3"></v-col>
            <v-col
                key=1
                cols="12"
                sm="6"
                >
                <v-card style="text-align: center" class="mt-5 mb-8">
                    <v-card-text style="background-color:rgb(249 248 113 / 50%);">
                        {{ $t('homepage.validate_recitation') }} <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-card-text>
                    <v-card-item >
                        <!-- <div class="text-h7 mb-1">
                            {{ $t('homepage.validate_recitation') }} <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </div> -->
                        <v-row style="margin-top:5px">
                            <v-col key=1 cols="4">
                                <p>{{$t('nav.today')}}</p>
                                <p class="mt-2"><v-chip>{{ this.validate_correctness_today }}</v-chip></p>
                            </v-col>
                            <v-col key=1 cols="4">
                                <p>{{$t('nav.total')}}</p>
                                <p class="mt-2"><v-chip>{{ this.validate_correctness_total }}</v-chip></p>
                            </v-col>
                            <v-col key=1 cols="4">
                                <p>{{$t('nav.accuracy')}}</p>
                                <p class="mt-2"><v-chip>{{ this.validate_correctness_accuracy }}%</v-chip></p>
                            </v-col>
                        </v-row>
                        <ProgressBar :vc_target="this.vc_target"
                                     :vc_progress="this.vc_progress"/>
                    </v-card-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn style="background-color:#5FD083; color: #fff;" prepend-icon="mdi-checkbox-marked-circle-outline" @click="toContinue()">
                            {{ $t('homepage.continue')  }}
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col key=1 cols="" sm="3"></v-col>
        </v-row>
        <v-row no-gutters>
            <v-col
            key=1
            cols="12"
            sm="6"
            >
            <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">{{ $t('homepage.goal') }}</p>
            <p class="text-h6 text-sm-subtitle-1 ma-2 pa-2">{{ $t('homepage.AI') }}</p>
            <div class="d-flex align-center ma-2 pa-2">
                <v-btn v-if="!loggedIn" style="background-color:#5FD083; color: #fff;" @click.prevent="login()">{{ $t('nav.login') }}</v-btn>
                <v-btn v-if="loggedIn" style="background-color:#5FD083; color: #fff;"
                @click="scroll('contribute_section')">{{ $t('nav.contribute') }}</v-btn>
                <p class="text-subtitle-1 text-sm-caption ma-2 pa-2">{{$t('homepage.more_than')}} {{this.vc_total}} {{ $t('homepage.statistics') }}</p>
            </div>
            <p style="text-align: center;" class="text-h6 text-sm-subtitle-1 ma-2 pa-2">{{ $t('homepage.you_can_download') }}</p>
            <div class="align-center ma-2 pa-2" style="text-align: center;">
                <!-- App Store button -->
                <a href="https://apps.apple.com/us/app/quran-app-read-memorize-learn/id1498169172?platform=iphone" target="_blank" class="market-btn apple-btn" role="button"
                   style="margin: 5px;">
                <span class="market-button-subtitle">{{ $t('homepage.download') }}</span>
                <span class="market-button-title">App Store</span>
                </a>

                <!-- Google Play button -->
                <a href="https://play.google.com/store/apps/details?id=com.nurios.quranapp" target="_blank" class="market-btn google-btn" role="button"
                   style="margin: 5px;">
                <span class="market-button-subtitle">{{ $t('homepage.download') }}</span>
                <span class="market-button-title">Google Play</span>
                </a>
            </div>
            </v-col>
            <v-col
                key=2
                cols="12"
                sm="6"
                >
                <!-- <v-img
                :width="500"
                src="@/assets/landpage.png"
                ></v-img> -->
                <iframe v-if="$i18n.locale === 'EN' || $i18n.locale === 'RU'"
                        :width="xsvalue? '100%' : '560'"
                        height="315"
                        src="https://www.youtube.com/embed/MVLrawwAs_I" 
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                <iframe v-if="$i18n.locale === 'AR'"
                        :width="xsvalue? '100%' : '560'"
                        height="315" 
                        src="https://www.youtube.com/embed/1ih_YuFUpkU" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
            </v-col>
        </v-row>
        
        <v-row id="contribute_section" ref="contribute_section">
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
                           :focus="$t('homepage.validate_focus')"
                           :ruaya="$t('homepage.validate_recitation_ruaya')"  
                           :hafs="$t('homepage.validate_hafs')"
                           :mdAndUpvalue="mdAndUpvalue"
                           InsLink="/instructions/vc"
                           :Link="vclink"
                           :xsvalue="xsvalue"
                           :vc_target="this.vc_target"
                           :vc_progress="this.vc_progress"/>
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
                           :xsvalue="xsvalue"
                           :vc_target="500"
                           :vc_progress="0"/>
            </v-col>
            <!-- <v-col
                key=2
                cols="12"
                sm="6"
                >
                <HomeCardComming  :Title="$t('homepage.transcribe_recitation')"
                                  Icon="mdi-feather"
                                  :Description="$t('homepage.transcribe_recitation_description')"
                                  :mdAndUpvalue="mdAndUpvalue"
                                  :xsvalue="xsvalue"/>
            </v-col> -->
        </v-row>
        <!-- <v-row>
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
        </v-row> -->
        <!-- <v-row style="height:200px"></v-row> -->
    </v-container>
    <Navbar/>
</template>
  
<script lang="ts">
    import HomeCard from '@/components/HomeCard.vue'
    import Navbar from '@/components/Navbar.vue';
    import ProgressBar from '@/components/ProgressBar.vue'
    import HomeCardComming from '@/components/HomeCardComming.vue'
    import UserInfoService from "@/services/userinfo.service";
    import AuthService from "@/services/auth.service";
    import TaskService from "@/services/tasks.service";
    import controltasksService from '@/services/controltasks.service';
    import homeService from '@/services/home.service';
    import { useDisplay } from 'vuetify'
    import amplitude from '@/amplitude/index.js'

    export default {
        components: {HomeCard, HomeCardComming,Navbar,ProgressBar},
        data: () =>({
            vclink: "/instructions/vc",
            validate_correctness_total: localStorage.getItem("vc_points"),
            validate_correctness_today: localStorage.getItem("vc_points_today"),
            validate_correctness_accuracy: localStorage.getItem("vc_accuracy"),
            vc_target: 1000,
            vc_progress: localStorage.getItem("vc_progress"),
            vc_total: localStorage.getItem("vc_total")
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
        methods:{
            scroll(id) {  
                const eventProperties = {
                    location: 'Home',
                };
                amplitude.track('Contribute Clicked', eventProperties);
                document.getElementById(id).scrollIntoView({
                behavior: "smooth"
                });
            },
            login(){
                const eventProperties = {
                    location: 'Home',
                };
                amplitude.track('Login Clicked', eventProperties);
                this.$router.push('/login');
            },
            get_today_vc_contribution(){
                TaskService.get_today_vc_contribution().then(
                (response) => {
                    localStorage.setItem("vc_points_today", response.data.count);
                    this.validate_correctness_today=response.data.count
                },
                (error) => {
                    console.log(error);
                }
                );
            },
            get_vc_user_accuracy(){
                controltasksService.get_validate_correctness_user_accuracy().then(
                (response) => {
                    let acc = Math.round(response.data.acc)
                    localStorage.setItem("vc_accuracy", acc.toString());
                    this.validate_correctness_accuracy=acc
                },
                (error) => {
                    console.log(error);
                }
                );
            }, me(){
                AuthService.getme().then(
                (response) => {
                    localStorage.setItem("vc_points", response.data.validate_correctness_tasks_no);
                    this.validate_correctness_total=response.data.validate_correctness_tasks_no
                },
                (error) => {
                    console.log(error);
                }
                );
            },
            get_vc_progress(){
                homeService.get_vc_statistics().then(
                (response) => {
                    let progress = response.data.solved_count
                    let total = response.data.total_count
                    this.vc_progress=progress;
                    this.vc_total=total;
                    localStorage.setItem("vc_progress", this.vc_progress);
                    localStorage.setItem("vc_total", this.vc_total);
                },
                (error) => {
                    console.log(error);
                }
                );
            },
            toContinue(){
                const eventProperties = {
                        location: 'Home',
                    };
                amplitude.track('VCContinue Clicked', eventProperties);
                this.$router.push(this.vclink);
            }
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
        mounted() {
            this.get_today_vc_contribution();
            this.get_vc_user_accuracy();
            this.me();
            this.get_vc_progress();
        },
    }
</script>
<style>
.market-btn {
    display: inline-block;
    padding: 0.3125rem 0.875rem;
    padding-left: 2.8125rem;
    -webkit-transition: border-color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    transition: border-color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    border: 1px solid #e7e7e7;
    background-position: center left 0.75rem;
    background-color: #fff;
    background-size: 1.5rem 1.5rem;
    background-repeat: no-repeat;
    text-decoration: none;
}
.market-btn .market-button-title {
    display: block;
    color: #222;
    font-size: 1.125rem;
}
.market-btn .market-button-subtitle {
    display: block;
    margin-bottom: -0.25rem;
    color: #888;
    font-size: 0.75rem;
}
.market-btn:hover {
    background-color: #f7f7f7;
    text-decoration: none;
}
.apple-btn {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDUgMzA1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDUgMzA1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnIGlkPSJYTUxJRF8yMjhfIj4KCTxwYXRoIGlkPSJYTUxJRF8yMjlfIiBkPSJNNDAuNzM4LDExMi4xMTljLTI1Ljc4NSw0NC43NDUtOS4zOTMsMTEyLjY0OCwxOS4xMjEsMTUzLjgyQzc0LjA5MiwyODYuNTIzLDg4LjUwMiwzMDUsMTA4LjIzOSwzMDUgICBjMC4zNzIsMCwwLjc0NS0wLjAwNywxLjEyNy0wLjAyMmM5LjI3My0wLjM3LDE1Ljk3NC0zLjIyNSwyMi40NTMtNS45ODRjNy4yNzQtMy4xLDE0Ljc5Ny02LjMwNSwyNi41OTctNi4zMDUgICBjMTEuMjI2LDAsMTguMzksMy4xMDEsMjUuMzE4LDYuMDk5YzYuODI4LDIuOTU0LDEzLjg2MSw2LjAxLDI0LjI1Myw1LjgxNWMyMi4yMzItMC40MTQsMzUuODgyLTIwLjM1Miw0Ny45MjUtMzcuOTQxICAgYzEyLjU2Ny0xOC4zNjUsMTguODcxLTM2LjE5NiwyMC45OTgtNDMuMDFsMC4wODYtMC4yNzFjMC40MDUtMS4yMTEtMC4xNjctMi41MzMtMS4zMjgtMy4wNjZjLTAuMDMyLTAuMDE1LTAuMTUtMC4wNjQtMC4xODMtMC4wNzggICBjLTMuOTE1LTEuNjAxLTM4LjI1Ny0xNi44MzYtMzguNjE4LTU4LjM2Yy0wLjMzNS0zMy43MzYsMjUuNzYzLTUxLjYwMSwzMC45OTctNTQuODM5bDAuMjQ0LTAuMTUyICAgYzAuNTY3LTAuMzY1LDAuOTYyLTAuOTQ0LDEuMDk2LTEuNjA2YzAuMTM0LTAuNjYxLTAuMDA2LTEuMzQ5LTAuMzg2LTEuOTA1Yy0xOC4wMTQtMjYuMzYyLTQ1LjYyNC0zMC4zMzUtNTYuNzQtMzAuODEzICAgYy0xLjYxMy0wLjE2MS0zLjI3OC0wLjI0Mi00Ljk1LTAuMjQyYy0xMy4wNTYsMC0yNS41NjMsNC45MzEtMzUuNjExLDguODkzYy02LjkzNiwyLjczNS0xMi45MjcsNS4wOTctMTcuMDU5LDUuMDk3ICAgYy00LjY0MywwLTEwLjY2OC0yLjM5MS0xNy42NDUtNS4xNTljLTkuMzMtMy43MDMtMTkuOTA1LTcuODk5LTMxLjEtNy44OTljLTAuMjY3LDAtMC41MywwLjAwMy0wLjc4OSwwLjAwOCAgIEM3OC44OTQsNzMuNjQzLDU0LjI5OCw4OC41MzUsNDAuNzM4LDExMi4xMTl6IiBmaWxsPSIjMmUyZTJlIi8+Cgk8cGF0aCBpZD0iWE1MSURfMjMwXyIgZD0iTTIxMi4xMDEsMC4wMDJjLTE1Ljc2MywwLjY0Mi0zNC42NzIsMTAuMzQ1LTQ1Ljk3NCwyMy41ODNjLTkuNjA1LDExLjEyNy0xOC45ODgsMjkuNjc5LTE2LjUxNiw0OC4zNzkgICBjMC4xNTUsMS4xNywxLjEwNywyLjA3MywyLjI4NCwyLjE2NGMxLjA2NCwwLjA4MywyLjE1LDAuMTI1LDMuMjMyLDAuMTI2YzE1LjQxMywwLDMyLjA0LTguNTI3LDQzLjM5NS0yMi4yNTcgICBjMTEuOTUxLTE0LjQ5OCwxNy45OTQtMzMuMTA0LDE2LjE2Ni00OS43N0MyMTQuNTQ0LDAuOTIxLDIxMy4zOTUtMC4wNDksMjEyLjEwMSwwLjAwMnoiIGZpbGw9IiMyZTJlMmUiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
}
.google-btn {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzVDREFERDsiIHBvaW50cz0iMjkuNTMsMCAyOS41MywyNTEuNTA5IDI5LjUzLDUxMiAyOTkuMDA0LDI1MS41MDkgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNCREVDQzQ7IiBwb2ludHM9IjM2OS4wNjcsMTgwLjU0NyAyNjIuMTc1LDExOS40NjcgMjkuNTMsMCAyOTkuMDA0LDI1MS41MDkgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNEQzY4QTE7IiBwb2ludHM9IjI5LjUzLDUxMiAyOS41Myw1MTIgMjYyLjE3NSwzODMuNTUxIDM2OS4wNjcsMzIyLjQ3IDI5OS4wMDQsMjUxLjUwOSAiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0E5NjsiIGQ9Ik0zNjkuMDY3LDE4MC41NDdsLTcwLjA2Myw3MC45NjFsNzAuMDYzLDcwLjk2MWwxMDguNjg4LTYyLjg3N2M2LjI4OC0zLjU5Myw2LjI4OC0xMS42NzcsMC0xNS4yNyAgTDM2OS4wNjcsMTgwLjU0N3oiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
}
.market-btn-light {
    border-color: rgba(255, 255, 255, 0.14);
    background-color: rgba(0, 0, 0, 0);
}
.market-btn-light .market-button-title {
    color: #fff;
}
.market-btn-light .market-button-subtitle {
    color: rgba(255, 255, 255, 0.6);
}
.market-btn-light:hover {
    background-color: rgba(255, 255, 255, 0.06);
}
.market-btn-light.apple-btn {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDUgMzA1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDUgMzA1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnIGlkPSJYTUxJRF8yMjhfIj4KCTxwYXRoIGlkPSJYTUxJRF8yMjlfIiBkPSJNNDAuNzM4LDExMi4xMTljLTI1Ljc4NSw0NC43NDUtOS4zOTMsMTEyLjY0OCwxOS4xMjEsMTUzLjgyQzc0LjA5MiwyODYuNTIzLDg4LjUwMiwzMDUsMTA4LjIzOSwzMDUgICBjMC4zNzIsMCwwLjc0NS0wLjAwNywxLjEyNy0wLjAyMmM5LjI3My0wLjM3LDE1Ljk3NC0zLjIyNSwyMi40NTMtNS45ODRjNy4yNzQtMy4xLDE0Ljc5Ny02LjMwNSwyNi41OTctNi4zMDUgICBjMTEuMjI2LDAsMTguMzksMy4xMDEsMjUuMzE4LDYuMDk5YzYuODI4LDIuOTU0LDEzLjg2MSw2LjAxLDI0LjI1Myw1LjgxNWMyMi4yMzItMC40MTQsMzUuODgyLTIwLjM1Miw0Ny45MjUtMzcuOTQxICAgYzEyLjU2Ny0xOC4zNjUsMTguODcxLTM2LjE5NiwyMC45OTgtNDMuMDFsMC4wODYtMC4yNzFjMC40MDUtMS4yMTEtMC4xNjctMi41MzMtMS4zMjgtMy4wNjZjLTAuMDMyLTAuMDE1LTAuMTUtMC4wNjQtMC4xODMtMC4wNzggICBjLTMuOTE1LTEuNjAxLTM4LjI1Ny0xNi44MzYtMzguNjE4LTU4LjM2Yy0wLjMzNS0zMy43MzYsMjUuNzYzLTUxLjYwMSwzMC45OTctNTQuODM5bDAuMjQ0LTAuMTUyICAgYzAuNTY3LTAuMzY1LDAuOTYyLTAuOTQ0LDEuMDk2LTEuNjA2YzAuMTM0LTAuNjYxLTAuMDA2LTEuMzQ5LTAuMzg2LTEuOTA1Yy0xOC4wMTQtMjYuMzYyLTQ1LjYyNC0zMC4zMzUtNTYuNzQtMzAuODEzICAgYy0xLjYxMy0wLjE2MS0zLjI3OC0wLjI0Mi00Ljk1LTAuMjQyYy0xMy4wNTYsMC0yNS41NjMsNC45MzEtMzUuNjExLDguODkzYy02LjkzNiwyLjczNS0xMi45MjcsNS4wOTctMTcuMDU5LDUuMDk3ICAgYy00LjY0MywwLTEwLjY2OC0yLjM5MS0xNy42NDUtNS4xNTljLTkuMzMtMy43MDMtMTkuOTA1LTcuODk5LTMxLjEtNy44OTljLTAuMjY3LDAtMC41MywwLjAwMy0wLjc4OSwwLjAwOCAgIEM3OC44OTQsNzMuNjQzLDU0LjI5OCw4OC41MzUsNDAuNzM4LDExMi4xMTl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBpZD0iWE1MSURfMjMwXyIgZD0iTTIxMi4xMDEsMC4wMDJjLTE1Ljc2MywwLjY0Mi0zNC42NzIsMTAuMzQ1LTQ1Ljk3NCwyMy41ODNjLTkuNjA1LDExLjEyNy0xOC45ODgsMjkuNjc5LTE2LjUxNiw0OC4zNzkgICBjMC4xNTUsMS4xNywxLjEwNywyLjA3MywyLjI4NCwyLjE2NGMxLjA2NCwwLjA4MywyLjE1LDAuMTI1LDMuMjMyLDAuMTI2YzE1LjQxMywwLDMyLjA0LTguNTI3LDQzLjM5NS0yMi4yNTcgICBjMTEuOTUxLTE0LjQ5OCwxNy45OTQtMzMuMTA0LDE2LjE2Ni00OS43N0MyMTQuNTQ0LDAuOTIxLDIxMy4zOTUtMC4wNDksMjEyLjEwMSwwLjAwMnoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
}
</style>