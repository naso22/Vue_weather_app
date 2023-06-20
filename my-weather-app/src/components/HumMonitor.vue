<template>
    <q-card class="my-card q-mt-lg text-center" style="width:700px;">
        <q-card-section>
            <div class="text-h6 text-grey-8">level of humidity</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
            <hum-chart :detail-weather-data="detailWeatherData" />
        </q-card-section>
    </q-card>
</template>
<script>

import {computed, defineComponent} from "vue";
import HumChart from "@/components/HumChart.vue";
export default defineComponent({
    components: {HumChart},
    props:['selectedCard','detailWeatherData'],
    setup(props){
        console.log(props.selectedCard.dt_txt.split(' ')[0])

        const detailWeatherData =computed(() =>{
            const selectedDay = props.selectedCard.dt_txt.split(' ')[0]
            return props.detailWeatherData[selectedDay]
        })
        return{detailWeatherData}
    }
})
</script>