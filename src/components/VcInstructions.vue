<template>
    <v-row id="Instructions">
        <v-col cols="12" style="text-align: center;margin-top:40px !important">
            <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">
                {{ $t('homepage.instructions') }}
            </p>
            <p class="text-h6 text-sm-subtitle-1 ma-2">
                {{ $t('homepage.validate_recitation_description') }} {{ $t('homepage.validate_focus') }} {{ $t('validate_instruction.task') }}
            </p>
            <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">
                <b>{{ $t('validate_instruction.hafs') }}</b>
            </p>
            <iframe v-if="$i18n.locale === 'AR'"
                    :width="xsvalue? '100%' : '560'"
                    height="315" 
                    src="https://www.youtube.com/embed/nuvmvz0j0oo" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
                    <iframe 
                    v-if="$i18n.locale === 'EN' || $i18n.locale === 'RU'"
                    :width="xsvalue? '100%' : '560'"
                    height="315" 
                    src="https://www.youtube.com/embed/VMUceoU9zv4" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
            <p class="text-h6 text-sm-subtitle-1 ma-2">
                {{ $t('instruction.calm') }}
            </p>
            <p class="text-h6 text-sm-subtitle-1">
                {{ $t('validate_instruction.options') }}
            </p>
            <v-row :style="$i18n.locale === 'AR' ? 'text-align: right;' : 'text-align: left;'">
                <v-col key=1 cols="1" sm="3"></v-col>
                <v-col key=2 cols="10" sm="6">
                    <p class="text-h6 text-sm-subtitle-1">
                        <span style="color:#AA9393;font-weight:bold;">
                            {{ $t('validate_instruction.problem') }}:
                        </span>{{ $t('validate_instruction.problem_options') }} 
                    </p>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col>
                            <p class="text-h6 text-sm-subtitle-1"> 
                                <span style="color:#796767;font-weight:bold;">
                                    {{ $t('validate_instruction.incomplete') }}
                                </span>: {{ $t('trainning.incomplete_feedback') }}
                            </p>
                            <p class="text-h6 text-sm-subtitle-1">
                                <span style="color:#4C7DCA;font-weight:bold;">
                                    {{ $t('instruction.examples') }}
                                </span>
                            </p>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="false"
                                        :audio = "audio" 
                                        audio-file-name="b3d414da-c7b2-4254-9e4a-1afddfe66d20.wav" 
                                        surra_number="999001" 
                                        aya_number="1"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="true" 
                                        :audio = "audio" 
                                        audio-file-name="b3d414da-c7b2-4254-9e4a-1afddfe66d20.wav" 
                                        surra_number="999001" 
                                        aya_number="1"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="true"
                                        :incomplete="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col>
                            <p class="text-h6 text-sm-subtitle-1"> 
                                <span style="color:#796767;font-weight:bold;">
                                    {{ $t('validate_instruction.different') }}
                                </span>: {{ $t('trainning.different_feedback') }}
                            </p>
                            <p class="text-h6 text-sm-subtitle-1">
                                <span style="color:#4C7DCA;font-weight:bold;">
                                    {{ $t('instruction.examples') }}
                                </span>
                            </p>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="false"
                                        :audio = "audio" 
                                        audio-file-name="019f65f0-8659-4e76-ad0a-a6e7f39b236b.wav" 
                                        surra_number="110" 
                                        aya_number="2"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                        :incomplete="true"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="true" 
                                        :audio = "audio" 
                                        audio-file-name="019f65f0-8659-4e76-ad0a-a6e7f39b236b.wav" 
                                        surra_number="110" 
                                        aya_number="2"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="true"
                                        :different="false"
                                        :multiple="true"
                                        :empty="true"
                                        :incomplete="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col>
                            <p class="text-h6 text-sm-subtitle-1"> 
                                <span style="color:#796767;font-weight:bold;">
                                    {{ $t('validate_instruction.multiple') }}
                                </span>: {{ $t('trainning.multiple_feedback') }}
                            </p>
                            <p class="text-h6 text-sm-subtitle-1">
                                <span style="color:#4C7DCA;font-weight:bold;">
                                    {{ $t('instruction.examples') }}
                                </span>
                            </p>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="false"
                                        :audio = "audio" 
                                        audio-file-name="78af3482-28a5-4896-a8b7-0ab12f9f3845.wav" 
                                        surra_number="103" 
                                        aya_number="1"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                        :incomplete="true"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="true" 
                                        :audio = "audio" 
                                        audio-file-name="78af3482-28a5-4896-a8b7-0ab12f9f3845.wav" 
                                        surra_number="103" 
                                        aya_number="1"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="true"
                                        :different="true"
                                        :multiple="false"
                                        :empty="true"
                                        :incomplete="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col>
                            <p class="text-h6 text-sm-subtitle-1">
                                <span style="color:#796767;font-weight:bold;">
                                    {{ $t('validate_instruction.empty') }}
                                </span>: {{ $t('trainning.empty_feedback') }}
                            </p>
                            <p class="text-h6 text-sm-subtitle-1"> 
                                <span style="color:#4C7DCA;font-weight:bold;">
                                    {{ $t('instruction.examples') }}
                                </span>
                            </p>
                            <p class="text-h6 text-sm-subtitle-1 ma-2" style="text-align: center;">
                                {{ $t('validate_instruction.not_arabic') }}
                            </p>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="false"
                                        :audio = "audio" 
                                        audio-file-name="6b1aa01a-29e7-47e0-97f5-b4199e61447a.wav" 
                                        surra_number="110" 
                                        aya_number="2"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                        :incomplete="true"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="true" 
                                        :audio = "audio" 
                                        audio-file-name="6b1aa01a-29e7-47e0-97f5-b4199e61447a.wav" 
                                        surra_number="110" 
                                        aya_number="2"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="true"
                                        :different="true"
                                        :multiple="true"
                                        :empty="false"
                                        :incomplete="true"
                                    />
                                </v-col>
                            </v-row>
                            <p class="text-h6 text-sm-subtitle-1 ma-2" style="text-align: center;margin-top: 40px !important;">
                                {{ $t('validate_instruction.not_related') }}
                            </p>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="false"
                                        :audio = "audio" 
                                        audio-file-name="a2a1ab69-f211-47a4-8986-e85babd8c53d.wav" 
                                        surra_number="1" 
                                        aya_number="5"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                        :disable_audio="false"
                                        :incomplete="true"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="true"
                                        :audio = "audio" 
                                        audio-file-name="a2a1ab69-f211-47a4-8986-e85babd8c53d.wav"  
                                        surra_number="1" 
                                        aya_number="5"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="true"
                                        :different="true"
                                        :multiple="true"
                                        :empty="false"
                                        :incomplete="true"
                                    />
                                </v-col>
                            </v-row>
                            <p class="text-h6 text-sm-subtitle-1 ma-2" style="text-align: center;margin-top: 40px !important;">
                                {{ $t('validate_instruction.empty_example') }}
                            </p>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="false"
                                        :audio = "audio" 
                                        audio-file-name="8932b153-7a69-4e9a-a0ce-5dfcb5533737.wav" 
                                        surra_number="1" 
                                        aya_number="5"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="false"
                                        :different="true"
                                        :multiple="true"
                                        :empty="true"
                                        :incomplete="true"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <ValidateQuestion  :problem="true" 
                                        :audio = "audio"
                                        audio-file-name="8932b153-7a69-4e9a-a0ce-5dfcb5533737.wav" 
                                        surra_number="1" 
                                        aya_number="5"
                                        :correct="true"
                                        :incorrect="true"
                                        :has_prob="true"
                                        :different="true"
                                        :multiple="true"
                                        :empty="false"
                                        :incomplete="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <p class="text-h6 text-sm-subtitle-1" style="margin-top: 40px !important;">
                        <span style="color:#F79191;font-weight:bold;">
                            {{ $t('validate_instruction.incorrect') }}:
                        </span>{{ $t('trainning.incorrect_feedback') }}
                    </p>
                    <p class="text-h6 text-sm-subtitle-1">
                        <span style="color:#4C7DCA;font-weight:bold;">
                            {{ $t('instruction.examples') }}
                        </span>
                    </p>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <ValidateQuestion  :problem="false"
                                :audio = "audio" 
                                audio-file-name="ffb6370b-413d-4e29-9522-b713f89afac6.wav" 
                                surra_number="1" 
                                aya_number="5"
                                :correct="true"
                                :incorrect="false"
                                :has_prob="true"
                                :different="true"
                                :multiple="true"
                                :empty="true"
                                :incomplete="true"
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <ValidateQuestion  :problem="false"
                                :audio = "audio" 
                                audio-file-name="e144fca8-4c88-4f87-931a-66577e3711e8.wav" 
                                surra_number="2255" 
                                aya_number="4"
                                :correct="true"
                                :incorrect="false"
                                :has_prob="true"
                                :different="true"
                                :multiple="true"
                                :empty="true"
                                :incomplete="true"
                            />
                        </v-col>
                    </v-row>
                    <p class="text-h6 text-sm-subtitle-1" style="margin-top: 40px !important;">
                        <span style="color:#5FD083;font-weight:bold;">
                            {{ $t('validate_instruction.correct') }}:
                        </span>{{ $t('trainning.correct_feedback') }}
                    </p>
                    <p class="text-h6 text-sm-subtitle-1">
                        <span style="color:#4C7DCA;font-weight:bold;">
                            {{ $t('instruction.examples') }}
                        </span>
                    </p>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <ValidateQuestion  :problem="false"
                                :audio = "audio" 
                                audio-file-name="2ab334d8-93aa-48ef-b675-a7cdf2e97ae8.wav" 
                                surra_number="103" 
                                aya_number="3"
                                :correct="false"
                                :incorrect="true"
                                :has_prob="true"
                                :different="true"
                                :multiple="true"
                                :empty="true"
                                :incomplete="true"
                            />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <ValidateQuestion  :problem="false"
                                :audio = "audio" 
                                audio-file-name="1cbb67e0-5565-46be-a32c-6f91d6fda082.wav" 
                                surra_number="1" 
                                aya_number="5"
                                :correct="false"
                                :incorrect="true"
                                :has_prob="true"
                                :different="true"
                                :multiple="true"
                                :empty="true"
                                :incomplete="true"
                            />
                        </v-col>
                    </v-row>
                    <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2" style="color:#FFD700">
                        {{ $t('instruction.summary') }}
                    </p>
                    <p class="text-h6 text-sm-subtitle-1"> 
                        {{ $t('validate_instruction.one') }}
                    </p>
                    <p class="text-h6 text-sm-subtitle-1"> 
                        {{ $t('validate_instruction.tow') }}
                    </p>
                    <p class="text-h6 text-sm-subtitle-1"> 
                        {{ $t('validate_instruction.three') }}
                    </p>
                    <p class="text-h6 text-sm-subtitle-1"> 
                        {{ $t('validate_instruction.four') }}
                    </p>
                </v-col>
                <v-col key=3 cols="1" sm="3"></v-col>
            </v-row>       
        </v-col>
    </v-row>
    <v-row v-if="!VCPass" style="margin-top: -50px;">
        <v-col cols="12" sm="3" lg="4"></v-col>
        <v-col cols="12" sm="6" lg="4" style="text-align: center;margin-top:40px !important">
            <p class="text-h6 text-sm-subtitle-1 ma-2 pa-2">{{ $t('instruction.intro') }}</p>
        </v-col>
        <v-col cols="12" sm="3" lg="4"></v-col>
    </v-row>
    <v-row v-if="Showstart" style="text-align: center;">
        <v-col>
            <v-btn style="background-color:#5FD083; color: #fff;"
                   @click="toTry()">
                {{ $t('instruction.start')  }}
            </v-btn>
        </v-col>
    </v-row>
    <v-row style="height:200px"></v-row>
</template>
<script lang="ts">
 import UserInfoService from "@/services/userinfo.service";
 import ValidateQuestion from "./ValidateQuestion.vue";
 import { useDisplay } from 'vuetify'
 import amplitude from '@/amplitude/index.js'
 export default {
    props:['Showstart'],
    components: {ValidateQuestion},
    setup () {
        // Destructure only the keys we want to use
        const { xs, mdAndUp } = useDisplay()
        var mdAndUpvalue = mdAndUp.value
        var xsvalue = xs.value
        return {mdAndUpvalue,xsvalue}
    },
    data: () => ({
        audio : new Audio(),
    }),
    mounted() {
        this.$nextTick(() => {
            document.getElementById('Instructions').scrollIntoView({
            behavior: "smooth"
            });
        });
    },
    created () {
        if(this.loggedIn){
            var visited = UserInfoService.getVisitVCInstructions()
            if(!visited)
                UserInfoService.updateVisitVCInstructions()
        }
    },
    methods:{
        toTry(){
            if(this.VCPass){
                this.$router.push('/task/vc');
            }
            else{
                this.$router.push('/train/vc');
            }
            const eventProperties = {
                location: 'VCInstructions',
            };
            amplitude.track('VCTry Clicked', eventProperties);
        }
    },
    computed: {
      VCPass(){
        return UserInfoService.getValidateCorrectnessResult()
      },
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
 }
</script>