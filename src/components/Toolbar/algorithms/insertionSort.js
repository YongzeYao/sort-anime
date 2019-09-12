export default function insertionSort(store) {
  const arr = store.state.array.slice();
  const toDispatch = [];
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  handleDispatch(toDispatch, store);
}

function handleDispatch(toDispatch, store) {}
