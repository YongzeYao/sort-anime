import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAnimating: false,
    interval: 100,
    algorithm: 'bubble',
    array: [],
    sorted: [],
    swapper: [],
    currentMax: [],
    selectionTwo: [],
    comparingTwo: [],
  },
  mutations: {
    setArray(state, newArray) {
      state.array = newArray;
    },
    setSorted(state, newSorted) {
      if (newSorted.length) {
        state.sorted.push(...newSorted);
      } else {
        state.sorted = [];
      }
    },
    setAlgorithm(state, newAlgorithm) {
      state.algorithm = newAlgorithm;
    },
    setSwapper(state, newSwapper) {
      state.swapper = newSwapper;
    },
    setIsAnimating(state, newIsAnimating) {
      state.isAnimating = newIsAnimating;
    },
    setInterval(state, newInterval) {
      state.interval = newInterval;
    },
    setCurrentMax(state, newCurrentMax) {
      state.currentMax = newCurrentMax;
    },
    setSelectionTwo(state, newSelectionTwo) {
      state.selectionTwo = newSelectionTwo;
    },
    setSelectionRelated(
      state,
      { sorted, array, comparingTwo, currentMax, swapper }
    ) {
      if (array) {
        this.commit('setArray', array);
      }
      if (sorted) {
        this.commit('setSorted', sorted);
      }
      if (comparingTwo) {
        this.commit('setComparingTwo', comparingTwo);
      }
      if (currentMax) {
        this.commit('setCurrentMax', currentMax);
      }
      if (swapper) {
        this.commit('setSwapper', swapper);
      }
    },
    setComparingTwo(state, newComparingTwo) {
      state.comparingTwo = newComparingTwo;
    },
    setSwapperAndComparingTwo(state, { swapper, comparingTwo }) {
      this.commit('setSwapper', swapper);
      this.commit('setComparingTwo', comparingTwo);
    },
  },
});
