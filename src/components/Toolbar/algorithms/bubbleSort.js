export default function bubbleSort(store) {
  const array = store.state.array.slice();
  const toDispatch = [];

  for (let i = array.length - 1; i > 0; i--) {
    let sorted = true;
    for (let j = 0; j < i; j++) {
      toDispatch.push({
        type: 'setComparingTwo',
        payload: [j, j + 1],
      });
      if (array[j] > array[j + 1]) {
        toDispatch.push({
          type: 'setSwapper',
          payload: [j, j + 1],
        });
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        sorted = false;
        toDispatch.push({
          type: 'setArray',
          payload: array.slice(),
        });
        toDispatch.push({
          type: 'setSwapper',
          payload: [],
        });
      }
    }

    toDispatch.push({
      type: 'setSorted',
      payload: [i],
    });
    if (sorted) {
      break;
    }
  }

  handleDispatches(toDispatch, store);
}

function handleDispatches(toDispatch, store) {
  const array = store.state.array.slice();
  if (!toDispatch.length) {
    store.commit('setComparingTwo', []);
    store.commit('setSorted', array.map((num, index) => index));
    store.commit('setIsAnimating', false);
    return;
  }

  let { type, payload } = toDispatch.shift();
  store.commit(type, payload);
  setTimeout(() => {
    handleDispatches(toDispatch, store);
  }, store.state.interval);
}
