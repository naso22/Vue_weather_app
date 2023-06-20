<template>
    <q-card class="my-card q-mt-lg text-center" style="width:95%;">
        <q-card-section>
            <div class="text-h6 text-grey-8">Weather information every 3 hours</div>
        </q-card-section>

        <q-separator inset />
            <weather-information :detail-weather-data="detailWeatherData"></weather-information>
    </q-card>
</template>
<script>

import {computed, defineComponent} from "vue";
import TempChart from "@/components/TempChart.vue";
import WeatherInformation from "@/components/WeatherInformation.vue";
export default defineComponent({
    components: {WeatherInformation, TempChart},
    props:['selectedCard','detailWeatherData'],
    setup(props){
        const detailWeatherData =computed(() =>{
            const selectedDay = props.selectedCard.dt_txt.split(' ')[0]
            return props.detailWeatherData[selectedDay]
        })
        return{detailWeatherData}
    }
})
</script>