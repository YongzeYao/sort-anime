export default function heapSort(store) {
  const arr = store.state.array.slice();
  const toDispatch = [];
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i, toDispatch);
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    toDispatch.push({
      type: 'setSwapper',
      payload: [i, 0],
    });
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    toDispatch.push({
      type: 'setArray',
      payload: arr.slice(),
    });
    toDispatch.push({
      type: 'setSorted',
      payload: [i],
    });
    heapify(arr, i, 0, toDispatch);
  }
  handleDispatch(toDispatch, store);
}

function heapify(arr, n, i, toDispatch) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n) {
    toDispatch.push({
      type: 'setComparingTwo',
      payload: [largest, l],
    });
    if (arr[l] > arr[largest]) {
      largest = l;
    }
  }

  if (r < n) {
    toDispatch.push({
      type: 'setComparingTwo',
      payload: [largest, r],
    });
    if (arr[r] > arr[largest]) {
      largest = r;
    }
  }

  if (largest !== i) {
    toDispatch.push({
      type: 'setSwapperAndComparingTwo',
      payload: {
        swapper: [largest, i],
        comparingTwo: [],
      },
    });
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    toDispatch.push({
      type: 'setComparingTwo',
      payload: [],
    });
    toDispatch.push({
      type: 'setArray',
      payload: arr.slice(),
    });
    heapify(arr, n, largest, toDispatch);
  }
}

function handleDispatch(toDispatch, store) {
  if (!toDispatch.length) {
    store.commit('setComparingTwo', []);
    store.commit('setSwapper', []);
    store.commit('setSorted', store.state.array.map((num, index) => index));
    store.commit('setIsAnimating', false);
    return;
  }

  const { type, payload } = toDispatch.shift();
  if (type === 'setArray') {
    store.commit('setSwapper', []);
    store.commit('setComparingTwo', []);
  }
  store.commit(type, payload);
  setTimeout(() => {
    handleDispatch(toDispatch, store);
  }, store.state.interval);
}
