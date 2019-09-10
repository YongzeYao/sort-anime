export default function bubbleSort(store) {
  const array = store.state.array.slice();
  const toDispatch = [];

  for (let i = array.length - 1; i > 0; i--) {
    let sorted = true;
    for (let j = 0; j < i; j++) {
      toDispatch.push([j, j + 1]); // bubbleTwo
      if (array[j] > array[j + 1]) {
        toDispatch.push([j, j + 1, true]); // swapper
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        sorted = false;
        toDispatch.push(array.slice()); // new array
        toDispatch.push([]); // clear swapper
      }
    }

    toDispatch.push([true, i]); // sorted
    if (sorted) {
      break;
    }
  }

  handleDispatches(toDispatch, store);
}

function handleDispatches(toDispatch, store) {
  const array = store.state.array.slice();
  if (!toDispatch.length) {
    // all sorted
    store.commit('setBubbleTwo', array.map((num, index) => index));
    setTimeout(() => {
      store.commit('setBubbleTwo', []); // clear bubbleTwo
      store.commit('setSorted', array.map((num, index) => index));
      store.commit('setIsAnimating', false);
    }, store.state.interval);
    return;
  }

  let currentDispatch = toDispatch.shift();
  if (currentDispatch.length > 3) {
    store.commit('setArray', currentDispatch);
  } else if (currentDispatch.length === 3 || currentDispatch.length === 0) {
    store.commit('setSwapper', currentDispatch);
  } else if (
    currentDispatch.length === 2 &&
    typeof currentDispatch[0] === 'boolean'
  ) {
    store.commit('setSorted', currentDispatch);
  } else {
    store.commit('setBubbleTwo', currentDispatch);
  }
  setTimeout(() => {
    handleDispatches(toDispatch, store);
  }, store.state.interval);
}
