<template>
    <v-card
        class="mx-auto ma-2 pa-2"
        :max-width="xsvalue? '100%' : mdAndUpvalue ? '70%' : '80%'"
        style="background-color: #F5F5F5;text-align: center"
        >
        <v-card-item>
        <div>
            <div class="text-h6 mb-1">
                {{ Title }} <v-icon>{{ Icon }}</v-icon>
            </div>
            <div class="text-caption ma-2" style="margin-bottom: 50px !important;">{{ Description }}</div>
            <ProgressBar :vc_target="vc_target"
                        :vc_progress="vc_progress"/>
        </div>
        </v-card-item>
        <v-card-subtitle class="ma-2 pa-2" 
        :style="$i18n.locale === 'AR' ? 'margin-top: 10px !important;' : $i18n.locale === 'AR' ?'margin-top: 45px !important;':'margin-top: 25px !important;'">
        <span class="ml-2">{{ $t('homepage.coming_soon') }}</span>
        <v-icon
          icon="mdi-sprout-outline"
        ></v-icon>
      </v-card-subtitle>
    </v-card>

</template>
<script lang="ts">
    import ProgressBar from '@/components/ProgressBar.vue'
    export default {
        components: {ProgressBar},
        props: ['Title','Icon','Description', 'mdAndUpvalue', 'xsvalue','vc_progress','vc_target'],
    }
</script>