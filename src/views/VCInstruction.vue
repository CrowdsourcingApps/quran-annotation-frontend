<template>
    <v-row>
        <v-col cols="12" style="text-align: center;margin-top:40px !important">
            <p class="font-weight-bold text-h4 text-sm-h5 ma-2 pa-2">{{ $t('homepage.instructions') }}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="3" lg="4"></v-col>
        <v-col cols="12" sm="6" lg="4" style="text-align: center;margin-top:40px !important">
            <p class="text-h6 text-sm-subtitle-1 ma-2 pa-2">{{ $t('instruction.intro') }}</p>
        </v-col>
        <v-col cols="12" sm="3" lg="4"></v-col>
    </v-row>
    <v-row style="text-align: center;">
        <v-col>
            <v-btn style="background-color:#5FD083; color: #fff;"
                   :to="VCPass ? '/task/vc' : '/train/vc' ">
                {{ $t('instruction.start')  }}
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
 import UserInfoService from "@/services/userinfo.service";
 export default {
    created () {
        if(this.loggedIn){
            var visited = UserInfoService.getVisitVCInstructions()
            console.log("visited "+visited)
            if(!visited)
                UserInfoService.updateVisitVCInstructions()
        }
    },
    computed: {
      VCPass(){
        return UserInfoService.getValidateCorrectnessResult()
      },
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    }
 }
</script>