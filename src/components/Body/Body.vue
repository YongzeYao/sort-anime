<template>
  <div class="body">
    <div
      v-for="(val, index) of array"
      :style="generateStyle(val, index)"
      :key="index"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const colorPrimary = '#409EFF';
const colorSuccess = '#67C23A';
const colorWarning = '#E6A23C';
const colorDanger = '#F56C6C';
const colorInfo = '#909399';

export default {
  methods: {
    generateStyle(val, index) {
      const array = this.array;
      const sorted = this.sorted;
      const swapper = this.swapper;
      const currentMax = this.currentMax;
      const comparingTwo = this.comparingTwo;
      const margin =
        array.length < 5
          ? 10
          : array.length < 8
          ? 8
          : array.length < 11
          ? 6
          : array.length < 20
          ? 4
          : array.length < 50
          ? 2
          : 1;
      const borderColor = swapper.includes(index)
        ? colorDanger
        : currentMax.includes(index)
        ? colorSuccess
        : comparingTwo.includes(index)
        ? colorWarning
        : sorted.includes(index)
        ? colorPrimary
        : colorInfo;
      return {
        width: this.barSize,
        height: val * 3 + 'px',
        borderRadius: '3px',
        // border: `2px solid ${borderColor}`,
        backgroundColor: `${borderColor}`,
        margin: `0 ${margin}px`,
      };
    },
  },
  computed: {
    ...mapState([
      'array',
      'sorted',
      'swapper',
      'currentMax',
      'algorithm',
      'comparingTwo',
    ]),
    barSize() {
      return (
        document.documentElement.clientWidth / this.array.length / 3 + 'px'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
}
</style>
