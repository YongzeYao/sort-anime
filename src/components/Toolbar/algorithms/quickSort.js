export default function quickSort(store) {
  const arr = store.state.array.slice();
  const toDispatch = [];
  quickSortHelper(arr, 0, arr.length, toDispatch);
  handleDispatch(toDispatch, store);
}

function quickSortHelper(arr, left, right, toDispatch) {
  if (left < right) {
    let partitionIndex = partition(arr, left, right, right - 1, toDispatch);
    toDispatch.push({
      type: 'setSorted',
      payload: [partitionIndex],
    });
    quickSortHelper(arr, left, partitionIndex, toDispatch);
    quickSortHelper(arr, partitionIndex + 1, right, toDispatch);
  }
}

function partition(arr, left, right, pivot, toDispatch) {
  let l = left;
  for (let i = left; i < right; i++) {
    toDispatch.push({
      type: 'setSwapperAndComparingTwo',
      payload: { swapper: [], comparingTwo: [i, pivot] },
    });
    if (arr[i] < arr[pivot]) {
      swap(arr, l, i, toDispatch);
      l++;
    }
  }
  swap(arr, l, pivot, toDispatch);
  return l;
}

function swap(arr, i, j, toDispatch) {
  if (i === j) return;
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  toDispatch.push({
    type: 'setSwapperAndComparingTwo',
    payload: { swapper: [i, j], comparingTwo: [] },
  });
  toDispatch.push({
    type: 'setArray',
    payload: arr.slice(),
  });
}

function handleDispatch(toDispatch, store) {
  if (!toDispatch.length) {
    store.commit('setSwapper', []);
    store.commit('setComparingTwo', []);
    store.commit('setSorted', store.state.array.map((num, index) => index));
    store.commit('setIsAnimating', false);
    return;
  }

  const { type, payload } = toDispatch.shift();
  store.commit(type, payload);
  setTimeout(() => {
    handleDispatch(toDispatch, store);
  }, store.state.interval);
}
