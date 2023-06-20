<template>
    <canvas id="tempChart"></canvas>
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
const temp = ref([]);
onMounted(() => {
    renderTempChart()
})

time.value = weatherKey.value.map(
    (key) => props.detailWeatherData[key]?.dt_txt?.split(' ')[1]
);
temp.value = weatherKey.value.map(
    (key) => props.detailWeatherData[key]?.main?.temp
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
    temp.value = weatherKey.value.map(
        (key) => props.detailWeatherData[key]?.main?.temp
    );
    renderTempChart(); // renderChart関数を呼び出す
});


function renderTempChart() {
    const ctx = document.getElementById('tempChart') as HTMLCanvasElement;

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
                    label: 'temp',
                    data: temp.value,
                    tension: 0.3,
                    borderColor: 'rgb(255,78,78)',
                    fill: true,
                    backgroundColor:'rgba(255,225,114,0.67)'
                }
            ]
        }
    });
}
</script>