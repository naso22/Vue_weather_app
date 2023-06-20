<template>
    <q-layout>
        <div class="">
            <div class="row">
                <div class=" bg-blue-1 justify-between q-mr-lg" style="width:80%">
                    <div class="q-pa-xl">
                        <h2 class="text-primary text-weight-regular text-bold">weather</h2>
                        <div class="q-mt-md text-h5">{{ today }}</div>
                    </div>
                    <div class="row justify-around">
                    <q-card v-for="weather in weatherSituation"
                            @click="selectCard(weather)"
                            :weather="weather"
                            bordered class="my-card q-p-md q-ma-lg cursor-pointer situation-card"
                            style="width: 15%"
                    >
                        <q-card-section class="q-pt-none">
                        </q-card-section>
                        <q-card-section>
                            <div v-if="weather.weather[0].main === 'Clear'" class="text-h2 text-center">🌤</div>
                            <div v-else-if="weather.weather[0].main === 'Clouds'" class="text-h2 text-center">🌥</div>
                            <div v-else class="text-h2 text-center">☔️</div>
                        </q-card-section>
                        <q-card-section>
                            <div class="text-h6 text-center text-grey-10">{{ weather.weather[0].main }}</div>
                        </q-card-section>

                        <q-separator inset/>
                        <q-card-section class="text-h6 text-center text-grey-7">
                            {{ weather.dt_txt.split(' ')[0] }}
                        </q-card-section>
                        <q-card-section class="text-center text-bold text-h5 text-grey-7">
                            {{ Math.round(weather.main.temp) }}°
                        </q-card-section>
                    </q-card>
                    </div>
                    <div class="row justify-around q-mb-lg">
                        <weather-forecast :selected-card="selectedWeather"
                                          :detail-weather-data="timeObjects"></weather-forecast>
                        <temp-monitor :selected-card="selectedWeather"
                                      :detail-weather-data="timeObjects"></temp-monitor>
                        <hum-monitor :selected-card="selectedWeather" :detail-weather-data="timeObjects"></hum-monitor>
                    </div>
                </div>
                <div>
                        <select-day class="scroll__card" style="width: 330px;" :selected-card="selectedWeather"></select-day>
                </div>
            </div>

        </div>
    </q-layout>
</template>

<script setup lang="ts">
import SelectDay from "@/components/SelectDay.vue";
import HumMonitor from "@/components/HumMonitor.vue";
import TempMonitor from "@/components/TempMonitor.vue";
import fetchWeather from "@/api/api.ts"
import {ref, computed, onMounted} from "vue";
import gsap from "gsap";
import WeatherForecast from "@/components/WeatherForecast.vue";
const today = new Date().toLocaleDateString('ja-JP');
const response = await fetchWeather();
const weatherSituation = [
    response.list[1],
    response.list[9],
    response.list[17],
    response.list[25],
    response.list[33]
]
const timeObjects = {};
for (const key in response.list) {
    const value = response.list[key];
    const dtTxt = value.dt_txt.split(' ')[0]; // "dt_txt"の年月日部分を取得
    if (dtTxt in timeObjects) {
        timeObjects[dtTxt][key] = value;
    } else {
        timeObjects[dtTxt] = {[key]: value};
    }
}

const selectedWeather = ref(weatherSituation[0])

function selectCard(weather) {
    selectedWeather.value = weather;
}
</script>

<style>
html {
    margin: 0;
    padding: 0;
}

* {
    margin: 0;
    padding: 0;
}

.scroll__card{
    position: sticky;
    top: 0;
}
</style>