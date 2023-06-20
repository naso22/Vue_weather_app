<template>
<div>
    <div class="q-mt-xl row items-start q-gutter-md text-white" >
        <q-card class="my-card bg-blue-3 text-center animation-select-card" style="width: 450px; height: 500px">
            <q-card-section v-if="selectedCard">
                <div v-if="selectedCard.weather[0].main ==='Clear'" class="text-h1 text-center">🌤</div>
                <div v-else-if="selectedCard.weather[0].main ==='Clouds'" class="text-h1 text-center">🌥</div>
                <div v-else class="text-h1 text-black">☔️</div>
            </q-card-section>

            <q-card-section class="q-mt-lg q-pt-none text-h2 text-weight-bolder">
                {{ Math.round(selectedCard.main.temp) }}°
            </q-card-section>

            <q-card-section class="q-pt-none text-h6  q-mt-lg">
                {{selectedCard.dt_txt.split(' ')[0]}}
            </q-card-section>

            <q-card-section class=" q-mt-lg q-pt-none text-h6">
                <div class="row justify-around q-mt-lg"><span>Wind</span>{{selectedCard.wind.speed}} km/h</div>
                <div class="row  justify-around q-mt-sm"><span>Hum </span>{{selectedCard.main.humidity}} %</div>
            </q-card-section>
        </q-card>
    </div>
</div>
</template>
<script setup>
import gsap from "gsap";
import {onMounted, ref} from 'vue';
const config = ref(null)
const props = defineProps({
    selectedCard: {
        type: Object,
    },

})
onMounted(()=>{
    selectCardAnimation()
})

function selectCardAnimation(){
    gsap.to(".animation-select-card", {
        duration: 1.5,
        y: 13,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });
}
</script>

<style scoped>
.scroll {
    position: sticky;
    top: 0;
}
</style>