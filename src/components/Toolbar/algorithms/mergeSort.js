export default function mergeSort(store) {
  const arr = store.state.array;
  const toDispatch = [];
  let finalArray = mergeSortHelper(
    arr.map((num, idx) => [num, idx]),
    toDispatch,
    0,
    arr.length - 1,
    { array: arr.slice() }
  );
  handleDispatch(toDispatch, store);
}

function mergeSortHelper(arr, toDispatch, start, end, obj) {
  // no need to sort if already length 1
  if (arr.length === 1) return arr;
  let half = Math.floor(arr.length / 2);
  let first = arr.slice(0, half);
  let second = arr.slice(half);
  let indexHalf = Math.floor((end + 1 + start) / 2);
  let actualFirst = mergeSortHelper(
    first,
    toDispatch,
    start,
    indexHalf - 1,
    obj
  );
  let actualSecond = mergeSortHelper(second, toDispatch, indexHalf, end, obj);
  let isFinalMerge =
    first.length + second.length === obj.array.length ? true : false;
  return merge(
    actualFirst,
    actualSecond,
    toDispatch,
    obj,
    start,
    end,
    isFinalMerge
  );
}

function merge(first, second, toDispatch, obj, start, end, isFinalMerge) {
  let sortedArray = [];
  let indexToPush = start;
  while (first.length && second.length) {
    toDispatch.push({
      type: 'setComparingTwo',
      payload: [first[0][1], second[0][1]],
    });
    if (first[0][0] <= second[0][0]) {
      indexToPush++;
      sortedArray.push(first.shift());
    } else {
      toDispatch.push({
        type: 'setSwapper',
        payload: [first[0][1], second[0][1]],
      });
      second[0][1] = indexToPush++;
      sortedArray.push(second.shift());
      // increase the indices of all elements of first array by 1
      first.forEach(subArr => subArr[1]++);
      if (start === 0) {
        obj.array = sortedArray
          .map(subArr => subArr[0])
          .concat(first.map(subArr => subArr[0]))
          .concat(second.map(subArr => subArr[0]))
          .concat(obj.array.slice(end + 1));
      } else {
        obj.array = obj.array
          .slice(0, start)
          .concat(sortedArray.map(subArr => subArr[0]))
          .concat(first.map(subArr => subArr[0]))
          .concat(second.map(subArr => subArr[0]))
          .concat(obj.array.slice(end + 1));
      }
      toDispatch.push({
        type: 'setArray',
        payload: obj.array.concat([indexToPush - 1, indexToPush]),
      });
      toDispatch.push({
        type: 'setSwapper',
        payload: [],
      });
    }
    if (isFinalMerge) {
      toDispatch.push({
        type: 'setSorted',
        payload: [indexToPush - 1],
      });
    }
  }
  return sortedArray.concat(first).concat(second);
}

function handleDispatch(toDispatch, store) {
  // finished sorting
  if (!toDispatch.length) {
    store.commit('setComparingTwo', []);
    store.commit('setSorted', store.state.array.map((num, index) => index));
    store.commit('setIsAnimating', false);
    return;
  }

  const { type, payload } = toDispatch.shift();
  if (type === 'setArray') {
    store.commit('setComparingTwo', []);
    store.commit('setSwapper', []);
    store.commit('setComparingTwo', payload.slice(payload.length - 2));
    store.commit('setSwapper', payload.slice(payload.length - 2));
    store.commit(type, payload.slice(0, payload.length - 2));
  } else {
    store.commit(type, payload);
  }
  setTimeout(() => {
    handleDispatch(toDispatch, store);
  }, store.state.interval);
}
