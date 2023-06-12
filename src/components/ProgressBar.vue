<template>
    <p class="mt-4">{{$t('homepage.help')}}{{ vc_target }}{{$t('homepage.annotation')}}</p>
    <v-row style="margin-top:-5px">
        <v-col key=1 cols="2" sm="2"></v-col>
        <v-col key=1 cols="8" sm="8">
            <v-progress-linear
            color="blue-lighten-3"
            :model-value="vc_progress * 100 / vc_target"
            :height="12"
            :reverse="$i18n.locale === 'AR'"
            rounded-bar
            striped
            class="mt-2"
            ></v-progress-linear>
        </v-col>
        <v-col key=1 cols="2" sm="2"></v-col>
    </v-row>
    <v-row style="margin-top:-42px !important">
        <v-col key=1 cols="3" sm="2">
            {{ vc_progress }}
        </v-col>
        <v-col key=1 cols="6" sm="8">
        </v-col>
        <v-col key=1 cols="3" sm="2">
            {{ vc_target }}
        </v-col>
    </v-row>
</template>
<script lang="ts">
export default {
    props:['vc_target','vc_progress'],
}
</script>