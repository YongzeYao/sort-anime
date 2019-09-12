<template>
  <div class="toolbar">
    <AlgorithmPicker />
    <SizeSlider />
    <IntervalInput />
    <el-button
      @click="changeSize(array.length)"
      :disabled="isAnimating"
      round
      plain
      type="primary"
      >Generate New Array</el-button
    >
    <el-button @click="sort" :disabled="isAnimating" round plain type="primary"
      >Sort</el-button
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AlgorithmPicker from './AlgorithmPicker';
import SizeSlider from './SizeSlider';
import IntervalInput from './IntervalInput';

import bubbleSort from './algorithms/bubbleSort';
import selectionSort from './algorithms/selectionSort';
import mergeSort from './algorithms/mergeSort';
import heapSort from './algorithms/heapSort';
import quickSort from './algorithms/quickSort';

export default {
  components: {
    AlgorithmPicker,
    SizeSlider,
    IntervalInput,
  },
  computed: {
    ...mapState(['isAnimating', 'algorithm', 'array']),
  },
  methods: {
    ...mapMutations(['setIsAnimating', 'setSorted', 'setArray', 'setSorted']),
    changeSize(newSize) {
      const newArray = [];
      for (let i = 0; i < newSize; i++) {
        newArray.push(this.generateRandNum(1, 200));
      }
      this.setSorted([]);
      this.setArray(newArray);
    },
    generateRandNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sort() {
      this.setIsAnimating(true);
      this.setSorted([]);
      switch (this.algorithm) {
        case 'bubble':
          bubbleSort(this.$store);
          break;
        case 'selection':
          selectionSort(this.$store);
          break;
        case 'merge':
          mergeSort(this.$store);
          break;
        case 'heap':
          heapSort(this.$store);
          break;
        case 'quick':
          quickSort(this.$store);
          break;
        default:
          console.log(`Not implemented`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid #dcdfe6;
}
</style>
