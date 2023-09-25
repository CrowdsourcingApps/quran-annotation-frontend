<template>
    <VcInstructions :Showstart=true />
</template>

<script>
import { useHead } from '@unhead/vue'
import VcInstructions from '@/components/VcInstructions.vue';
export default {
    components: {VcInstructions},
    setup(){
        useHead({
        title: 'Quran Voice - Instructions of validate correctness task',
        meta: [
            {
            name: 'description',
            content: 'Instructions of validate the correctness of word pronunciation',
            },
        ],
        link:[
            {
                rel: 'canonical',
                href: 'https://www.quranvoice.live/instructions/vc', // Canonical URL
            }
        ]
        })
    }
}
</script>