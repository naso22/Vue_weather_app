<template>
    <div class="row justify-around">
    <q-card v-for="weather in detailWeatherData"
            :weather="weather"
            class="my-card  q-ma-lg weather-card" style="width:9%"
    >
        <q-card-section class="text-grey-7 text-bold text-h6">
            {{hideSeconds(weather.dt_txt.split(' ')[1])}}
        </q-card-section>

            <div v-if="weather.weather[0].main === 'Clear'" class="text-h3 text-center">🌤</div>
            <div v-else-if="weather.weather[0].main === 'Clouds'" class="text-h3 text-center">🌥</div>
            <div v-else class="text-h3 text-center">☔️</div>

        <q-card-section>
            <div class=" text-center text-grey-8 text-bold">{{ weather.weather[0].main }}</div>
        </q-card-section>
        <q-separator inset/>
        <q-card-section class="text-center text-bold text-subtitle1 text-grey-7">
            {{ Math.round(weather.main.temp) }}°
        </q-card-section>
    </q-card>
    </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, watch,ref} from "vue";
import gsap from "gsap";
const props = defineProps({
    detailWeatherData: {
        type: Object,
        required: true,
    }
})

onMounted(()=>{
    animation()
})

watch(() => props.detailWeatherData, (newWeatherData) => {
    console.log(newWeatherData);
    animation();
}, { deep: true });
const isAnimating = ref(false);

function animation() {
    if (!isAnimating.value) {
        isAnimating.value = true;
        gsap.from(".weather-card", {
            duration: 1,
            scale: 0.5,
            opacity: 0,
            delay: 0,
            stagger: 0,
            ease: "elastic",
            force3D: true
        }).then(() => {
            isAnimating.value = false;
        });
    }
}
function hideSeconds(time){
    return time.split(':')[0] + ':' + time.split(':')[1];
}


</script>

