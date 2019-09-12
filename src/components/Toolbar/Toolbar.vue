<template>
  <div class="toolbar">
    <AlgorithmPicker />
    <SizeSlider />
    <IntervalInput />
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

export default {
  components: {
    AlgorithmPicker,
    SizeSlider,
    IntervalInput,
  },
  computed: {
    ...mapState(['isAnimating', 'algorithm']),
  },
  methods: {
    ...mapMutations(['setIsAnimating', 'setSorted']),
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
