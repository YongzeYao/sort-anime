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
      // if (newSwapper.length) {
      //   state.swapper.push(...newSwapper);
      // } else {
      //   state.swapper = [];
      // }
      state.swapper = newSwapper;
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
    setSelectionRelated(
      state,
      { sorted, array, selectionTwo, currentMax, swapper }
    ) {
      if (array) {
        this.commit('setArray', array);
      }
      if (sorted) {
        this.commit('setSorted', sorted);
      }
      if (selectionTwo) {
        this.commit('setSelectionTwo', selectionTwo);
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
