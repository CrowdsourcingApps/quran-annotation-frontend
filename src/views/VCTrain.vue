<template>
    <v-row>
        <v-col cols="0" sm="3">
        </v-col>
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
        <v-col col="0" sm="3">
        </v-col>
    </v-row>
    <v-row style="margin-top: 10px;">
        <v-col cols="1" sm="3">
        </v-col>
        <v-col cols="10" sm="6">
            <v-card class="mx-auto ma-2 pa-2" style="text-align: center;">
                <v-card-text class="ma-2 pa-2">
                   {{ $t('trainning.listen')  }} 
               </v-card-text>
                <v-btn 
                        class="mr-3"
                        variant="outlined"
                        color="black"
                        icon="mdi-play"
                    ></v-btn>
                <v-card-text class="ma-2 pa-2">
                    {{ $t('trainning.recited_correctly')  }} 
                </v-card-text>
                <v-card-text class="ma-2 pa-2 text-h5">مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ</v-card-text>
                <v-card-subtitle v-if="problem" class="ma-2 pa-2">
                    {{ $t('trainning.what_problem') }}
                </v-card-subtitle>
                <div v-if="!problem" style="display: inline-grid;">
                    <v-btn color="success" style="margin: 10px; color: #fff !important;">
                        {{ $t('trainning.correct') }}
                    </v-btn>
                    <v-btn color="fail" style="margin: 10px; color: #fff !important;">
                        {{ $t('trainning.incorrect') }}
                    </v-btn>
                    <v-btn @click="toggleProblem()" color="invalid" style="margin: 10px;">
                        {{ $t('trainning.problem') }}
                    </v-btn>
                </div>
                <div v-if="problem" style="display: inline-grid;">
                    <v-btn variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.empty') }}
                    </v-btn>
                    <v-btn variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.different') }}
                    </v-btn>
                    <v-btn variant="outlined" color="invalidoption" style="margin: 10px">
                        {{ $t('trainning.multiple') }}
                    </v-btn>
                    <v-btn @click="toggleProblem()" color="invalid" style="margin: 10px;" v-model="problem">
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
                        title="Alert title"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
                    ></v-alert>
                    <v-alert
                        v-if="message === false"
                        style="background-color: #F79191 !important; color: #fff !important;"
                        density="compact"
                        type="warning"
                        title="Alert title"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
                    ></v-alert>
                </v-col>
            </v-row>
            <v-row style="margin: 15px;">
                <v-btn variant="text" color="info" prepend-icon="mdi-notebook-outline">{{ $t('homepage.instructions') }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="message!=null" variant="text" color="info" prepend-icon="mdi-chevron-left">Next</v-btn>
            </v-row>
        </v-col>
        <v-col col="1" sm="3">
        </v-col>
    </v-row>
  </template>
<script>
 export default {
    data: () => ({
      problem: false,
      message: null,
      q1: 'blue',
      q2: 'white',
      q3: 'white',
      q4: 'white',
      q5: 'white',
      q6: 'white',
      q7: 'white', //success,fail, blue
    }),
    methods:{
        toggleProblem(){
            this.problem = !this.problem;
        }
    }
 }
</script>