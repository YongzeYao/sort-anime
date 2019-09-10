<template>
  <div class="size-input">
    <span>Array Size:</span>
    <el-slider
      :min="5"
      :disabled="isAnimating"
      @input="changeSize"
      class="slider"
      v-model="size"
    ></el-slider>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'SizeSlider',
  data() {
    return {
      size: 10,
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
    ...mapState(['isAnimating']),
  },
};
</script>

<style lang="scss" scoped>
.size-input {
  margin: 0 20px;
  display: flex;
  align-items: center;
  .slider {
    width: 200px;
    margin-left: 15px;
  }
}
</style>
