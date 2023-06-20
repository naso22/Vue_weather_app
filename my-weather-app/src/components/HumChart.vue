<template>
    <canvas id="chartCanvas"></canvas>
</template>

<script setup lang="ts">
import {defineProps, onMounted, watch, ref} from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    detailWeatherData: {
        type: Object,
        required: true,
    }
})
const weatherKey = ref( Object.keys(props.detailWeatherData));
const time = ref([]);
const hum = ref([]);
onMounted(() => {
    renderChart()
})

time.value = weatherKey.value.map(
    (key) => props.detailWeatherData[key]?.dt_txt?.split(' ')[1]
);
hum.value = weatherKey.value.map(
    (key) => props.detailWeatherData[key]?.main?.humidity
);

watch(() => props.detailWeatherData, (newData) => {
    if (newData) {
        weatherKey.value = Object.keys(newData);
    }
});

watch(weatherKey, () => {
    time.value = weatherKey.value.map(
        (key) => props.detailWeatherData[key]?.dt_txt?.split(' ')[1]
    );
    hum.value = weatherKey.value.map(
        (key) => props.detailWeatherData[key]?.main?.humidity
    );
    renderChart(); // renderChart関数を呼び出す
});


function renderChart() {
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;

    // 既存のグラフを破棄する
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }

    // 新しいグラフを作成する
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: time.value,
            datasets: [
                {
                    label: 'humidity',
                    data: hum.value,
                    tension: 0.3,
                    fill: true,

                }
            ]
        }
    });
}
</script>