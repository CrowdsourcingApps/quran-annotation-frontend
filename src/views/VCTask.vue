<template>
    <!-- Put error component-->
   <Error :error="error"/>
   <!-- Thanks card for finishing the 5 questions round-->
   <v-row v-if="end" style="margin-top: 50px;">
        <v-col cols="1" sm="3"></v-col>
        <v-col col ="10" sm="6">
            <v-card class="mx-auto ma-2 pa-2" style="text-align: center;">
                <v-card-text class=" text-h5 ma-2 pa-2" style="text-align: center">
                    <v-icon class="ma-2" icon="mdi-party-popper" color="gold"></v-icon>
                    {{ $t('support.jazak')  }} 
                    <v-icon class="ma-2" icon="mdi-party-popper" color="gold"></v-icon>
                </v-card-text>
                <v-card-text class=" text-h5 ma-2 pa-2" style="text-align: center;line-height: 2.25rem;">
                    {{ $t('tasks.completed')  }} 
                </v-card-text>
                <v-card-text> {{$t('tasks.contribution_today')+ " "+this.answers.length+" "+ $t('tasks.tasks')  }}</v-card-text>
                <v-card-text class="text-h5" v-if="end_result"> {{$t('trainning_session.ready')}} </v-card-text>
                <v-btn style="margin: 10px; color: #fff !important;" color="success" 
                       @click="reloadPage()">
                        {{ $t('tasks.contribute_again') }}
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
            <v-timeline line-inset="200" direction="horizontal" >
                    <v-timeline-item @click="timelineItemClicked(index)" v-for="(color, index) in time_line_colors" :key="index" 
                        size="small" :dot-color="color" icon="mdi-check"></v-timeline-item>
            </v-timeline> 
        </v-col>
    </v-row>
    <v-row v-if="!loading && !end && !error" style="margin-top: 0px;">
        <v-col cols="1" sm="3">
        </v-col>
        <v-col cols="10" sm="6">
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
            <v-row style="margin: 15px;">
                <v-btn @click="back()" :disabled="index==0" variant="outlined" color="info" :prepend-icon="$i18n.locale === 'AR'? 'mdi-chevron-right' : 'mdi-chevron-left' ">{{ $t('tasks.back') }}</v-btn>
                <v-spacer></v-spacer>
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
                <!-- Here we should put report button-->
                <v-btn @click="skip()" v-if="index!=this.questions.length" variant="outlined" color="info" :prepend-icon="$i18n.locale === 'AR'? 'mdi-chevron-left' : 'mdi-chevron-right' ">{{ $t('tasks.skip') }}</v-btn>
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
 import TasksService from "@/services/tasks.service"
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
            title: 'صوت القرآن - المساهمة في التحقق من التلاوة',
            meta: [
                {
                name: 'description',
                content: 'قم بتحديد فيما إذا قام القارئ بلفظ الكلمات مع الحركات بشكل صحيح.',
                },
            ],
            link:[
                {
                    rel: 'canonical',
                    href: 'https://www.quranvoice.live/task/vc', // Canonical URL
                }
            ]
            })
        }
        else if(CurrentLocale == 'RU')
        {

        }
        else{
        useHead({
        title: 'Quran Voice - Contribute to validate correctness task',
        meta: [
            {
            name: 'description',
            content: 'Specify if the reciter pronounce the words with diacritics correctly',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/task/vc', // Canonical URL
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
      time_line_colors: [],
      answers: [],
      disabled: false,
      end: false,
      audio: new Audio(),
      Instructions_dialog: false,
    }),
    created(){
        this.getRealTasks();
    },
    methods: {
        timelineItemClicked(index) {
            // Check if the timeline item is blue before allowing interaction
            if ((this.time_line_colors[index] === 'success' || this.time_line_colors[index] ==='blue') && this.index != index) {
            // Handle the interaction or navigation here
            // You can perform any action you want when the user clicks a blue timeline item
            // For example, you can navigate to a specific question or perform some other action
            if(this.audio)
                this.audio.pause();
            this.index = index
            this.loading = true;
            this.problem = false;
            this.currnet = this.questions[this.index];
            this.disabled = false;
            this.loading = false;
            }
        },
        InstructionsClicked(){
            const eventProperties = {
                location: 'VCTask',
            };
            amplitude.track('VCInstructions Clicked', eventProperties);
        },
        toggleProblem(){
            this.problem = !this.problem;
        },
        reloadPage(){
            window.location.reload()
        },
        getRealTasks() {
            TasksService.get_validate_correctness().then(
                (response) => {
                    this.questions = response.data;
                    this.currnet = this.questions[0];
                    this.time_line_colors= new Array(this.questions.length).fill('white');
                    this.time_line_colors[0] = 'blue'
                    this.loading = false;
                },
                (error) => {
                    if(error.response.status === 404)
                        this.error = 'tasks.404_message'
                    else if(error.response.status === 400)
                        this.error = 'tasks.400_message'
                    else if(error.response.status === 403)
                        this.error = 'tasks.403_message'
                    else
                        this.error = 'error'
                    this.loading = false;
                }
            );
        },
        setAnswer(label){
            this.disabled = true;
            // Check if an answer with the same id already exists in the answers array
            const existingAnswer = this.answers.find((answer) => answer.id === this.currnet.id);
            if (existingAnswer) {
                // Update the existing answer
                existingAnswer.label = label;
            } else {
            let newAnswer = {
                        id: this.currnet.id,
                        label: label,
                        control_task: this.currnet.control_task
                    };
            this.answers.push(newAnswer);
            this.time_line_colors[this.index] = 'success';
            }
            // see if it's the last questions
            if(this.index === this.questions.length - 1){
                // submit answers
                this.loading = true;
                this.saveAnswers()
            }
            else{
                this.next()
            }      
        },
        next(){
            if(this.audio)
                this.audio.pause();
            this.loading = true;
            this.problem = false;
            this.index = this.index +1;
            while(this.time_line_colors[this.index] == 'success'){
                this.index = this.index +1;
            }
            this.currnet = this.questions[this.index];
            this.time_line_colors[this.index] = 'blue';
            this.disabled = false;
            this.loading = false;
        },
        skip(){
            amplitude.track('VCSkip Clicked');
            if(this.audio)
                this.audio.pause();
            this.loading = true;
            this.problem = false;
            this.time_line_colors[this.index] = 'fail';
            // see if it's the last questions
            if(this.index === this.questions.length - 1){
                // submit answers
                this.loading = true;
                this.saveAnswers()
            }
            else{
                this.index = this.index +1;
                this.currnet = this.questions[this.index];
                this.time_line_colors[this.index] = 'blue';
                this.disabled = false;
                this.loading = false;
            }
        },
        back(){
            amplitude.track('VCBack Clicked');
            if(this.audio)
                this.audio.pause();
            this.loading = true;
            this.problem = false;
            this.index = this.index -1;
            this.currnet = this.questions[this.index];
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
        },
        saveAnswers(){
            TasksService.save_validate_correctness_answers(this.answers)
                .then(
                    (response) => {
                    // show the thanks element 
                    this.end = true;
                    this.loading = false;
                },
                (error) => {
                    if(error.response.status === 400){
                        const message = error.response.data.detail
                        if(message === 'Participant should pass the entrance exam first')
                            this.error = 'tasks.400_message'
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
    beforeRouteLeave(to, from, next) {
        if(this.answers.length>0){
            this.saveAnswers()
        }
        next();
    }
 }
</script>