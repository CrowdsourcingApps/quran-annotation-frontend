<template>
    <v-snackbar :min-width="0" location="top" rounded v-model="snackbar.show" :timeout="snackbar.duration" :color="snackbar.color">
        <span style="color: #fff !important;"><v-icon>mdi-link-variant</v-icon> {{ $t('homepage.Copied') }}</span>
    </v-snackbar>
    <v-row
        justify="center"
        class="text-center sulotion"
        style="background-color:#D9D9D9;margin-top: 5px;"
      >
        <v-col key="1" cols="12" sm="4"></v-col>
        <v-col key="2" cols="12" sm="4"
          class="align-center"
          >
          <p>{{ $t('footer.help') }}</p>
          <v-btn
            icon="mdi-link-variant"
            @click="showSnackbar()"
            size="small"
            class="ma-2"
          >
          </v-btn>
          <v-btn
            icon="mdi-facebook"
            href="https://www.facebook.com/quranvoice.live"
            target="_blank"
            size="small"
            class="ma-2"
          >
          </v-btn>
          <v-btn
            icon="mdi-instagram"
            href="https://www.instagram.com/quranvoice.live/"
            target="_blank"
            size="small"
            class="ma-2"
          >
          </v-btn>
          <!-- <p class="text-caption">{{ $t('footer.license') }}</p> -->
        </v-col>
        <v-col key="3" cols="12" sm="4"></v-col
        >
      </v-row>
</template>
<script lang="ts">
    export default {
        data: () =>({
            snackbar: {
                show: false,
                duration: 1000, // 3 seconds
                color: 'success',
                message: ''
            }
        }),
        methods:{
            async showSnackbar() {
                const url ="https://www.quranvoice.live/"
                try {
                await navigator.clipboard.writeText(url);
                this.snackbar.show = true;
                this.snackbar.color = 'success'; // Change color as needed
                setTimeout(() => {
                    this.snackbar.show = false;
                }, this.snackbar.duration);

                } catch($e) {
                    console.log("Problem with copying ", $e)
                }
            }
        }
    }
</script>