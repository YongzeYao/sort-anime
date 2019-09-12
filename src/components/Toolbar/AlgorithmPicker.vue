<template>
  <el-select :disabled="isAnimating" v-model="algorithm">
    <el-option
      v-for="algorithm of algorithms"
      :key="algorithm.value"
      :value="algorithm.value"
      :label="algorithm.label"
      :disabled="algorithm.disabled"
    ></el-option>
  </el-select>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AlgorithmPicker',
  data() {
    return {
      algorithms: [
        { value: 'bubble', label: 'Bubble Sort' },
        // { value: 'insertion', label: 'Insertion Sort', disabled: true },
        { value: 'selection', label: 'Selection Sort' },
        { value: 'merge', label: 'Merge Sort' },
        { value: 'heap', label: 'Heap Sort' },
        { value: 'quick', label: 'Quick Sort' },
      ],
    };
  },
  methods: {
    ...mapMutations(['setArray', 'setSorted']),
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
  },
  computed: {
    ...mapState(['isAnimating', 'array']),
    algorithm: {
      get: function() {
        return this.$store.state.algorithm;
      },
      set: function(val) {
        this.$store.commit('setAlgorithm', val);
        this.changeSize(this.array.length);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
