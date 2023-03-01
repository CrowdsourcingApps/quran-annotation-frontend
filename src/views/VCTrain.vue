<template>
   <!-- Put error component-->
   <!-- Put card you made it or try again-->
   <v-row v-if="end" style="margin-top: 50px;">
        <v-col cols="1" sm="3"></v-col>
        <v-col col ="10" sm="6">
            <v-card class="mx-auto ma-2 pa-2" style="text-align: center;">
                <v-card-text class=" text-h5 ma-2 pa-2" style="text-align: center">
                    <v-icon class="ma-2" icon="mdi-party-popper" color="gold"></v-icon>
                    {{ $t('support.mash')  }} 
                    <v-icon class="ma-2" icon="mdi-party-popper" color="gold"></v-icon>
                </v-card-text>
                <v-card-text class=" text-h5 ma-2 pa-2" style="text-align: center">
                    {{ $t('trainning_session.completed')  }} 
                </v-card-text>
                <v-card-text> {{$t('trainning_session.Points')+ " "+this.correct_answers+" / 7"  }}</v-card-text>
                <v-card-text class="text-h5" v-if="end_result"> {{$t('trainning_session.ready')}} </v-card-text>
                <v-card-text v-if="!end_result"> {{$t('trainning_session.train_again')}} </v-card-text>
                <v-btn color="success" style="margin: 10px; color: #fff !important;">
                        {{ end_result? $t('trainning_session.contribute') : $('trainning_session.try') }}
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
    <v-row v-if="!loading && !end" style="justify-content: center">
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
            </v-timeline> 
        </v-col>
    </v-row>
    <v-row v-if="!loading && !end" style="margin-top: 0px;">
        <v-col cols="1" sm="3">
        </v-col>
        <v-col cols="10" sm="6">
            <v-card class="mx-auto" style="text-align: center;">
                <v-card-text class="ma-2 pa-2">
                {{ $t('trainning.listen')  }} 
            </v-card-text>
                <!-- <audio controls id="myVideo" autoplay loop  hidden>
                    <source :src="currnet.audio_file_name" type="audio/wav">
                    Your browser does not support the audio element.
                </audio> -->
                <v-btn @click="playAudio()"
                        class="mr-3"
                        variant="outlined"
                        color="black"
                        icon="mdi-play"
                    ></v-btn>
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
                    <v-btn :disabled="disabled" @click="setAnswer('not_related_quran')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.empty') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="setAnswer('not_match_aya')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.different') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="setAnswer('multiple_aya')" variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.multiple') }}
                    </v-btn>
                    <v-btn :disabled="disabled" @click="toggleProblem()" color="invalid" style="margin: 10px;" v-model="problem">
                        {{ $t('trainning.back') }}
                    </v-btn>
                </div>
            </v-card>
            <v-row style="margin-top: 10px;">
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
            <v-row style="margin: 15px;">
                <v-btn variant="text" color="info" prepend-icon="mdi-notebook-outline">{{ $t('homepage.instructions') }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="next()" v-if="index!=6" variant="text" color="info" prepend-icon="mdi-chevron-left">{{ $t('trainning.next') }}</v-btn>
            </v-row>
        </v-col>
        <v-col col="1" sm="3">
        </v-col>
    </v-row>
</template>
<script>
 import Question from "@/models/question"
 import quran from "@/Quran.json"
 import ControlTasksService from "@/services/controltasks.service"
 export default {
    data: () => ({
      error : null,
      loading: true,
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
      answers: [],
      disabled: false,
      end: false,
      end_result: true,
      correct_answers: 0,
      audio: null,
    }),
    created(){
        this.getTrainningTasks();
    },
    methods: {
        toggleProblem(){
            this.problem = !this.problem;
        },
        getTrainningTasks() {
            ControlTasksService.get_validate_correctness().then(
                (response) => {
                    this.questions = response.data;
                    this.currnet = this.questions[0]
                    this.loading = false;
                },
                (error) => {
                    if(error.response.status === 404)
                        this.message = this.$t('trainning.404_message')
                    else if(error.response.status === 400){
                        //if error.response.
                        // TODO
                    }
                    else
                        this.error = this.$t('error')
                }
            );
        },
        setAnswer(label){
            this.disabled = true;
            let newAnswer = {
                            id: this.currnet.id,
                            label: label
                        };
            this.answers.push(newAnswer);
            const correct_label = this.currnet.label
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
                this.text = this.text + this.$t('trainning.problem') +" < " + this.$t('trainning.multiple')+" >. "+ this.$t('trainning.multiple_feedback')
            else if(correct_label === 'correct') 
                this.text = this.text  +" < "+  this.$t('trainning.correct')+" >. "+ this.$t('trainning.correct_feedback')
            else if(correct_label === 'in_correct') 
                this.text = this.text  +" < "+  this.$t('trainning.incorrect')+" >. "+ this.$t('trainning.incorrect_feedback')
            else if(correct_label === 'not_related_quran') 
                this.text = this.text + this.$t('trainning.problem') +" < "+ this.$t('trainning.empty')+" >. "+ this.$t('trainning.empty_feedback')
            else if(correct_label === 'not_match_aya') 
                this.text = this.text + this.$t('trainning.problem') +" < "+ this.$t('trainning.different')+" >. "+ this.$t('trainning.different_feedback')
            // see if it's the last questions
            if(this.index === 6){
                // submit answers
                // show the result 
                this.end = true;
                console.log("submit to save answers")
            }      
        },
        next(){
            this.message = null;
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
            this.audio = new Audio('http://'+this.currnet.audio_file_name);
            this.audio.play();
        }
    }
 }
</script>