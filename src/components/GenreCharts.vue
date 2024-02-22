<template>
  <div class="genreCharts" v-if="isReady">
    <div class="genreCharts__controls" ref="controls">
      <button
        @click.prevent="setData('1999', $event)"
        class="genreCharts__button"
      >
        1999
      </button>
      <button
        @click.prevent="setData('2003', $event)"
        class="genreCharts__button"
      >
        2003
      </button>
      <button
        @click.prevent="setData('2022', $event)"
        class="genreCharts__button"
      >
        2022
      </button>
        <button
          @click.prevent="setData('total', $event)"
          class="genreCharts__button isActive"
        >
        Total
      </button>
    </div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import * as ChartImport from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import type { GenresData, Year } from "../types/types";

const props = defineProps<{
  data: GenresData;
}>();
const { data } = toRefs(props);

const FONT_FAMILY: string = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

const controls = ref<HTMLElement | null>(null);

const { Chart, Tooltip, Legend, BarElement, CategoryScale, LinearScale } =
  ChartImport;

Chart.register(
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const isReady = ref<boolean>(false);

const chartData = ref({
  labels: ["Rock", "Electronic", "Hip Hop", "R&B", "Other"],
  datasets: [
    {
      data: [] as number[],
      barPercentage: 0.55,
      backgroundColor: "#ff3530",
      borderRadius: 3,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      anchor: "end",
      align: "top",
      offset: 5,
      color: "rgb(26, 26, 26)",
      font: {
        family: FONT_FAMILY,
        size: 16,
      },
      formatter: function(value: number, context: unknown) {
          return `${value.toString()}%`
        }
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      // display: false,
      ticks: {
        color: "rgb(26, 26, 26)",
        font: {
          family: FONT_FAMILY,
          size: 16,
        }
      },
    },
    y: {
      min: 0,
      max: 100,
      gridLines: {
        display: false,
      },
      display: false,   
    }
  }
});

async function setData(year: keyof GenresData, event?: Event) {
  const rawData: Year = data.value[year];

  const genres = ["Rock", "Electronic", "Hip Hop", "R&B", "Other"];
  let numberOfAlbums = 0;
  if (year === "1999" || year === "2003") {
			numberOfAlbums = 100;
		} else if (year === "2022") {
			numberOfAlbums = 150;
		} else if (year === "total") {
			numberOfAlbums = 239;
		}
  const d: number[] = [];
  // This makes sure the order is always the same.
  genres.forEach(g => {
    const val = rawData[g as keyof Year];
    d.push(
      Math.round((val / numberOfAlbums * 100 + Number.EPSILON) * 10) / 10
    );
  });
  chartData.value = {
    labels: ["Rock", "Electronic", "Hip Hop", "R&B", "Other"],
    datasets: [
      {
        data: d,
        barPercentage: 0.55,
        backgroundColor: "#ff3530",
        borderRadius: 3,
      },
    ],
  };

  if (event) {
    const btns = controls.value?.querySelectorAll("button");
    btns?.forEach(b => {
      b.classList.remove("isActive");
    });

    const btn = event.target;
    if (btn && btn instanceof Element) {
      btn.classList.add("isActive")
    }
  }
}

onMounted(() => {
  setData("total");
  isReady.value = true;
})
</script>

<style lang="scss" scoped>
.genreCharts {
  height: 50rem;
  width: 100%;
  max-width: 80rem;
  margin-right: auto;
  margin-left: auto;

  &__controls {
    display: flex;
    justify-content: center;
    gap: 3rem;
  }

  &__button {
    all: unset;

    position: relative;

    padding: .3rem .6rem;

    border-bottom: .1rem solid transparent;
    cursor: pointer;

    &::after {
      content: "";

      position: absolute;
      top: 100%;
      left: 0;

      display: block;
      height: .2rem;
      width: 100%;

      background-color: transparent;
      border-radius: .1rem;
    }

    &.isActive {
      &::after {
        background-color: var(--pitchfork-red);
      }
    }
  }
}
</style>