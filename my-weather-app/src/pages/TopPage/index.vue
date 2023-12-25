<template>
    <q-layout>
        <div>
            <div class="row justify-center no-wrap ">
                <div class="  justify-between q-mr-lg  body--lithe" :class="{'body--dark': mode}">
                    <div class="q-pa-xl row justify-between">
                        <div>
                        <h2 class="text-blue-6  text-weight-bold">weather</h2>
                        <div class="q-mt-md text-indigo-8 text-h5 text-weight-bold">{{ today }}</div>
                        </div>
                        <q-btn
                            class="hoge"
                            color="white"
                            text-color="black"
                            label="Toggle"
                            @click="toggleDark()"
                        />
                    </div>
                    <div class="row justify-around">
                    <q-card v-for="weather in weatherSituation"
                            @click="selectCard(weather)"
                            :weather="weather"
                            bordered class="my-card q-p-md q-ma-lg cursor-pointer situation-card "
                            :class="{'card--dark' : mode}"
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
                        <q-card-section class="text-h6 text-center text-grey-7 " :class="{'text-white' : mode}">
                            {{ weather.dt_txt.split(' ')[0] }}
                        </q-card-section>
                        <q-card-section class="text-center text-bold text-h5 text-grey-7" :class="{'section-text--white' : mode}">
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
                <div class="bg-white" :class="{'section--dark' : mode}" style="width: 20%">
                        <select-day class="scroll__card " style="width: 100%; margin-left: 5%"   :selected-card="selectedWeather"></select-day>
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
import { useQuasar } from 'quasar'
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

const mode = ref(false);


const toggleDark = () => {
    mode.value = !mode.value;
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
.body--lithe{
    color: white;
    background-color: #d1eafd;
}

.body--dark {
    color: white;
    background-color: #223b93;
}

.section--dark{
    background-color: #0e2269;
}
.section-text--white{
    color: white;
}

.card--dark{
    color: white;
    background-color: rgb(54,70,128);
}

</style>