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
    bubbleTwo: [],
    insertionTwo: [],
    currentMax: [],
    selectionTwo: [],
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
      if (newSwapper.length) {
        state.swapper.push(...newSwapper);
      } else {
        state.swapper = [];
      }
    },
    setBubbleTwo(state, newBubbleTwo) {
      state.bubbleTwo = newBubbleTwo;
    },
    setIsAnimating(state, newIsAnimating) {
      state.isAnimating = newIsAnimating;
    },
    setInterval(state, newInterval) {
      state.interval = newInterval;
    },
    setInsertionTwo(state, newInsertionTwo) {
      state.insertionTwo = newInsertionTwo;
    },
    setCurrentMax(state, newCurrentMax) {
      state.currentMax = newCurrentMax;
    },
    setSelectionTwo(state, newSelectionTwo) {
      state.selectionTwo = newSelectionTwo;
    },
  },
});
