<template>
  <div class="interval-input">
    <span>Anime Speed: </span>
    <el-input
      :disabled="isAnimating"
      class="input"
      v-model="interval"
    ></el-input>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'IntervalInput',
  data() {
    return {};
  },
  computed: {
    ...mapState(['isAnimating']),
    interval: {
      set: function(val) {
        this.$store.commit('setInterval', val);
      },
      get: function() {
        return this.$store.state.interval;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.interval-input {
  margin-right: 15px;
  display: flex;
  align-items: center;
  .input {
    width: 100px;
    margin-left: 15px;
  }
}
</style>
