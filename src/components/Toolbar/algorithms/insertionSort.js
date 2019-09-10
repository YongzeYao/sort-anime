export default function insertionSort(store) {
  const arr = store.state.array.slice();
  const toDispatch = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1;
    toDispatch.push([j, j + 1]); // insertionTwo
    while (j >= 0 && arr[j] > temp) {
      toDispatch.push([j, j + 1]); // insertionTwo
      toDispatch.push([j, j + 1, true]); //swapper
      arr[j + 1] = arr[j];
      toDispatch.push(arr.slice()); // array
      toDispatch.push([]); // clear swapper
      j--;
    }
    toDispatch.push([true, i]); // sorted
    arr[j + 1] = temp;
    toDispatch.push(arr.slice()); // array
  }
}

function handleDispatch(toDispatch, store) {}
