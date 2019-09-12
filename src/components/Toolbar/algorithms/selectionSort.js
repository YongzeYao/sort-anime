export default function selectionSort(store) {
  const arr = store.state.array.slice();
  const toDispatch = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    let max = 0;
    toDispatch.push({
      type: 'setCurrentMax',
      payload: [max],
    });
    for (let j = 0; j <= i; j++) {
      toDispatch.push({
        type: 'setSelectionTwo',
        payload: [j, max],
      });
      if (arr[j] > arr[max]) {
        max = j;
        toDispatch.push({
          type: 'setSelectionTwo',
          payload: [j, max],
        });
        toDispatch.push({
          type: 'setCurrentMax',
          payload: [max],
        });
      }
    }
    if (max !== i) {
      let temp = arr[max];
      arr[max] = arr[i];
      arr[i] = temp;
      toDispatch.push({
        type: 'setSwapper',
        payload: [max, i],
      });
    }
    toDispatch.push({
      type: 'setCurrentMax',
      payload: [],
    });
    toDispatch.push({
      type: 'setSelectionTwo',
      payload: [],
    });
    toDispatch.push({
      type: 'setArray',
      payload: arr.slice(),
    });
    toDispatch.push({
      type: 'setSwapper',
      payload: [],
    });
    toDispatch.push({
      type: 'setSorted',
      payload: [i],
    });
  }
  handleDispatches(toDispatch, store);
}

function handleDispatches(toDispatch, store) {
  if (!toDispatch.length) {
    // finished sorting
    setTimeout(() => {
      store.commit('setSwapper', []); // clear swapper
      store.commit('setSorted', store.state.array.map((num, index) => index));
      store.commit('setIsAnimating', false);
    }, store.state.interval);
    return;
  }

  const currentDispatch = toDispatch.shift();
  store.commit(currentDispatch.type, currentDispatch.payload);
  setTimeout(() => {
    handleDispatches(toDispatch, store);
  }, store.state.interval);
}
