<template>
    <v-row v-if="error" style="margin-top: 50px;">
        <v-col cols="1" sm="3"></v-col>
        <v-col col ="10" sm="6">
            <v-alert
                style="background-color: #F79191 !important; color: #fff !important;"
                density="compact"
                type="warning"
                :title="$t('excuse')"
                :text="$t(error)"
            ></v-alert>
        </v-col>
        <v-col cols="1" sm="3"></v-col>
   </v-row>
</template>
<script lang="ts">
export default {
    props:['error'],
}
</script>