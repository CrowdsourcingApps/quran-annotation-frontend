<template>
   <div v-if="end_result == null && !error" style="text-align: center;margin-top: 10px;">
        <p class="text-h6 text-sm-h5">{{ $t('trainning.title') }} - {{ $t('trainning.correct_answers') }} {{ this.correct_answers }} / {{ this.questions.length }}</p>
   </div>
   <!-- Put error component-->
   <Error :error="error"/>
   <!-- You made it or try again Card-->
   <v-row v-if="end" style="margin-top: 50px;">
        <v-col cols="1" sm="3"></v-col>
        <v-col col ="10" sm="6">
            <v-card class="mx-auto ma-2 pa-2" style="text-align: center;">
                <v-card-text  v-if="end_result" class=" text-h5 ma-2 pa-2" style="text-align: center">
                    <v-icon class="ma-2" icon="mdi-party-popper" color="gold"></v-icon>
                    {{ $t('support.mash')  }} 
                    <v-icon class="ma-2" icon="mdi-party-popper" color="gold"></v-icon>
                </v-card-text>
                <v-card-text  v-if="!end_result" class=" text-h5 ma-2 pa-2" style="text-align: center">
                    <v-icon class="ma-2" icon="mdi-emoticon-sad-outline" color="fail"></v-icon>
                    {{ $t('trainning_session.sorry')  }} 
                    <v-icon class="ma-2" icon="mdi-emoticon-sad-outline" color="fail"></v-icon>
                </v-card-text>
                <v-card-text v-if="end_result" class=" text-h5 ma-2 pa-2" style="text-align: center;line-height: 2.25rem;">
                    {{ $t('trainning_session.completed')  }} 
                </v-card-text>
                <v-card-text> {{$t('trainning_session.Points')+ " "+this.correct_answers+" / 8"  }}</v-card-text>
                <v-card-text class="text-h5" v-if="end_result"> {{$t('trainning_session.ready')}} </v-card-text>
                <v-card-text v-if="!end_result"> {{$t('trainning_session.train_again')}} </v-card-text>
                <v-btn v-if="end_result"  style="margin: 10px; color: #fff !important;" color="success" 
                        to="/task/vc">
                        {{ $t('trainning_session.contribute')}}
                </v-btn>
                <v-btn v-if="!end_result"  style="margin: 10px; color: #fff !important;" color="success" 
                       @click="reloadPage()">
                        {{ $t('trainning_session.try') }}
                </v-btn>
            </v-card>
        </v-col>
        <v-col cols="1" sm="3"></v-col>
   </v-row>
   <v-row v-if="loading" style="margin-top: 50px;">
        <v-col cols="4" ></v-col>
        <v-col cols="4" style="text-align: center">
            <v-progress-circular indeterminate :size="51" :width="7"></v-progress-circular>
        </v-col>
   </v-row>
    <v-row v-if="!loading && !end && !error" style="justify-content: center">
        <v-col cols="12" sm="6">
            <v-timeline line-inset="50" direction="horizontal" >
                    <v-timeline-item size="small" :dot-color="q1">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q2">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q3">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q4">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q5">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q6">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q7">
                    </v-timeline-item>
                    <v-timeline-item size="small" :dot-color="q8">
                    </v-timeline-item>
            </v-timeline> 
        </v-col>
    </v-row>

    <v-row v-if="!loading && !end && !error" style="margin-top: 0px;">
        <v-col cols="1" sm="3">
        </v-col>
        <v-col cols="10" sm="6">
            <!-- Feedback Component-->
            <v-row>
                <v-col>
                    <v-alert
                        v-if="message"
                        style="color: #fff !important;"
                        density="compact"
                        type="success"
                        :title="title"
                        :text="text"
                    ></v-alert>
                    <v-alert
                        v-if="message === false"
                        style="background-color: #F79191 !important; color: #fff !important;"
                        density="compact"
                        type="warning"
                        :title="title"
                        :text="text"
                    ></v-alert>
                </v-col>
            </v-row>
            <!-- Question Component-->
            <v-card class="mx-auto" style="text-align: center;">
                <v-card-text class="ma-2 pa-2">
                {{ $t('trainning.listen')  }} 
            </v-card-text>
                <v-btn @click="playAudio(audioFileName)"
                        class="mr-3"
                        variant="outlined"
                        color="black"
                        icon="mdi-play"
                        v-if="!loading_audio"
                    ></v-btn>
                <v-progress-circular v-if="loading_audio" model-value="20" :size="47" indeterminate></v-progress-circular>
                <v-card-text class="ma-2 pa-2">
                    {{ $t('trainning.recited_correctly')  }} 
                </v-card-text> 
                <v-card-text style="line-height: 2.25rem;" class="ma-2 pa-2 text-h5">{{ quran[currnet.surra_number][currnet.aya_number]['uthmani'] }}</v-card-text>
                <v-card-subtitle v-if="problem" class="ma-2 pa-2">
                    {{ $t('trainning.what_problem') }}
                </v-card-subtitle>
                <div v-if="!problem" style="display: inline-grid;">
                    <v-btn :disabled="disabled" @click="setAnswer('correct')" color="success" style="margin: 10px; color: #fff !important;">
                        {{ $t('trainning.correct') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="setAnswer('in_correct')" color="fail" style="margin: 10px; color: #fff !important;">
                        {{ $t('trainning.incorrect') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="toggleProblem()" color="invalid" style="margin: 10px;">
                        {{ $t('trainning.problem') }}
                    </v-btn>
                </div>
                <div v-if="problem" style="display: inline-grid;">
                    <v-btn :disabled="disabled" @click="setAnswer('in_complete')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.incomplete') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="setAnswer('not_match_aya')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.different') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="setAnswer('multiple_aya')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.multiple') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="setAnswer('not_related_quran')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.empty') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="toggleProblem()" color="invalid" style="margin: 10px;" v-model="problem">
                        {{ $t('trainning.back') }}
                    </v-btn>
                </div>
            </v-card>

           
            <!-- Question Footer Component-->
            <v-row style="margin: 15px;">
                <v-btn variant="outlined" color="info" prepend-icon="mdi-notebook-outline" @click="InstructionsClicked()">
                    {{ $t('homepage.instructions') }}
                    <v-dialog
                        v-model="Instructions_dialog"
                        activator="parent"
                        width="auto"
                    >
                        <v-card>
                            <VcInstructions :Showstart=false />
                            <v-card-actions>
                                <v-btn color="invalid" block @click="Instructions_dialog = false">{{ $t('trainning.close') }}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="next()" v-if="index!=7" variant="outlined" color="info" 
                    :prepend-icon="$i18n.locale === 'AR'? 'mdi-chevron-left' : 'mdi-chevron-right'"
                    :disabled="next_disable">
                    {{ $t('trainning.next') }}</v-btn>
            </v-row>
        </v-col>
        <v-col col="1" sm="3">
        </v-col>
    </v-row>
</template>
<script>
 import { useHead } from '@unhead/vue'
 import Question from "@/models/question"
 import quran from "@/Quran.json"
 import ControlTasksService from "@/services/controltasks.service"
 import VcInstructions from '@/components/VcInstructions.vue';
 import Error from '@/components/Error.vue';
 import amplitude from '@/amplitude/index.js'
 export default {
    components: {VcInstructions, Error},
    setup(){
        const CurrentLocale = localStorage.getItem('userLocale');
        if(CurrentLocale == 'AR')
        {
            useHead({
            title: 'صوت القرآن - اختبار التحقق من صحة التلاوة',
            meta: [
                {
                name: 'description',
                content: 'قم باجتياز التدريب من خلال التحديد بشكل صحيح فيما إذا قام القارئ بنطق الكلمات مع الحركات بشكل صحيح.',
                },
            ],
            link:[
                {
                    rel: 'canonical',
                    href: 'https://www.quranvoice.live/train/vc', // Canonical URL
                }
            ]
            })
        }
        else if(CurrentLocale == 'RU')
        {

        }
        else{
        useHead({
        title: 'Quran Voice - Validate correctness task Test',
        meta: [
            {
            name: 'description',
            content: 'Pass the training by specify correctlty if the reciter pronounce the words with diacritics correctly or not',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/train/vc', // Canonical URL
            }
        ]
        })
        }
    },
    data: () => ({
      error : null,
      loading: true,
      loading_audio: false,
      quran: quran,
      questions: [],
      currnet: new Question(),
      index: 0,
      problem: false,
      message: null,
      title: null,
      text: null,
      q1: 'blue',
      q2: 'white',
      q3: 'white',
      q4: 'white',
      q5: 'white',
      q6: 'white',
      q7: 'white',
      q8: 'white',
      answers: [],
      disabled: false,
      end: false,
      end_result: null,
      correct_answers: 0,
      audio: new Audio(),
      Instructions_dialog: false,
      next_disable: true
    }),
    created(){
        this.getTrainningTasks();
    },
    methods: {
        InstructionsClicked(){
            const eventProperties = {
                location: 'VCTrain',
            };
            amplitude.track('VCInstructions Clicked', eventProperties);
        },
        toggleProblem(){
            this.problem = !this.problem;
        },
        reloadPage(){
            window.location.reload()
        },
        getTrainningTasks() {
            ControlTasksService.get_validate_correctness().then(
                (response) => {
                    this.questions = response.data;
                    this.currnet = this.questions[0];
                    this.loading = false;
                },
                (error) => {
                    if(error.response.status === 404)
                        this.error = 'trainning.404_message'
                    else if(error.response.status === 400){
                        const message = error.response.data.detail
                        if(message === 'Participant already pass the entrance exam')
                            this.error = 'trainning.400_message'
                        else
                            // "Participant not allowed to attempt more than 5 times"
                            this.error = 'trainning.404_message'
                    }
                    else
                        this.error = 'error'
                    this.loading = false;
                }
            );
        },
        setAnswer(label){
            this.next_disable = false;
            this.disabled = true;
            let newAnswer = {
                            id: this.currnet.id,
                            label: label
                        };
            this.answers.push(newAnswer);
            const correct_label = this.currnet.label
            let reason =""
            const CurrentLocale = localStorage.getItem('userLocale');
            if (CurrentLocale === 'AR') {
                reason = this.currnet.reason_ar;
            } else if (CurrentLocale === 'EN') {
                reason = this.currnet.reason_en;
            } else {
                reason = this.currnet.reason_ru;
            }

            if(label === correct_label)
            {
                this['q' + (this.index + 1)] = 'success';
                this.message = true;
                this.correct_answers = this.correct_answers + 1;
                this.title = this.$t('trainning.correct_answer')
            } 
            else {
                this['q' + (this.index + 1)] = 'fail';
                this.message = false;   
                this.title = this.$t('trainning.Incorrect_answer')
            }
            this.text = this.$t('trainning.answer_correct_is')+ " "
            if(correct_label === 'multiple_aya')
            {
                this.text += this.$t('trainning.problem') +" < " + this.$t('trainning.multiple')+" >. " 
                this.text += reason !== null ? reason + ". " : '';
                this.text += this.$t('trainning.multiple_feedback')
            }
            else if(correct_label === 'correct')
            {
                this.text += " < "+  this.$t('trainning.correct')+" >. "
                this.text += reason !== null ? reason + ". " : '';
                this.text += this.$t('trainning.correct_feedback')
            }
            else if(correct_label === 'in_correct')
            {
                this.text +=" < "+  this.$t('trainning.incorrect')+" >. "
                this.text += reason !== null ? reason + ". " : '';
                // this.text += this.$t('trainning.incorrect_feedback')
            } 
               
            else if(correct_label === 'not_related_quran')
            {
                this.text +=this.$t('trainning.problem') +" < "+ this.$t('trainning.empty')+" >. "
                this.text += reason !== null ? reason + ". " : '';
                this.text +=this.$t('trainning.empty_feedback')
            } 
                
            else if(correct_label === 'not_match_aya')
            {
                this.text +=this.$t('trainning.problem') +" < "+ this.$t('trainning.different')+" >. "
                this.text += reason !== null ? reason + ". " : '';
                this.text +=this.$t('trainning.different_feedback')
            } 
            else if(correct_label === 'in_complete')
            {
                this.text +=this.$t('trainning.problem') +" < "+ this.$t('trainning.incomplete')+" >. "
                this.text += reason !== null ? reason + ". " : '';
                this.text +=this.$t('trainning.incomplete_feedback')
            } 
            // see if it's the last questions
            if(this.index === 7){
                // submit answers
                this.loading = true;
                ControlTasksService.save_validate_correctness_answers(this.answers)
                .then(
                    (response) => {
                    const result = response.data.pass_exam;
                    if(result===true)
                        this.end_result = true;
                    else
                        this.end_result = false;
                    // show the result 
                    this.end = true;
                    this.loading = false;
                },
                (error) => {
                    if(error.response.status === 400){
                        const message = error.response.data.detail
                        if(message === 'Participant already pass the entrance exam')
                            this.error = 'trainning.400_message'
                        else
                            // "Participant's answers should be equal to 7"
                            this.error = 'error'
                    }
                    else
                        this.error = 'error'
                    this.loading = false;
                }
                );

            }      
        },
        next(){
            this.message = null;
            this.next_disable = true;
            if(this.audio)
                this.audio.pause();
            this.loading = true;
            this.problem = false;
            this.index = this.index +1;
            this.currnet = this.questions[this.index];
            this['q' + (this.index + 1)] = 'blue';
            this.disabled = false;
            this.loading = false;
        },
        playAudio(){
            this.loading_audio = true;
            this.audio.src = 'https://'+this.currnet.audio_file_name;
            this.audio.load();
            this.audio.addEventListener('canplaythrough', () => {
                if (this.audio.readyState === 4) {
                    this.audio.play();
                    this.loading_audio = false;
                }
            });
        }
    }
 }
</script>