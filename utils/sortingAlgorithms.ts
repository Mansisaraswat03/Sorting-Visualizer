type SwapCallback = (arr: number[]) => void;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const swap = async (
  arr: number[],
  i: number,
  j: number,
  onSwap?: SwapCallback
) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  if (onSwap) {
    onSwap([...arr]);
  }
  await delay(0);
};

export const sortingAlgorithms = {
  async insertionSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];

    for (let i = 1; i < newArr.length; i++) {
      let j = i;
      while (j > 0 && newArr[j] < newArr[j - 1]) {
        await swap(newArr, j, j - 1, onSwap);
        j--;
      }
    }

    return newArr;
  },

  async selectionSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];

    for (let i = 0; i < newArr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[j] < newArr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        await swap(newArr, i, minIndex, onSwap);
      }
    }

    return newArr;
  },
  async mergeSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await this.mergeSort(arr.slice(0, mid), onSwap);
    const right = await this.mergeSort(arr.slice(mid), onSwap);

    return merge(left, right, onSwap);
  },

  async heapSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];
    const n = newArr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(newArr, n, i, onSwap);
    }

    for (let i = n - 1; i > 0; i--) {
      await swap(newArr, 0, i, onSwap);
      await heapify(newArr, i, 0, onSwap);
    }

    return newArr;
  },
  async quickSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];
    await quickSortHelper(newArr, 0, newArr.length - 1, onSwap);
    return newArr;
  },
  async shellSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];
    const n = newArr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        let j = i;
        while (j >= gap && newArr[j] < newArr[j - gap]) {
          await swap(newArr, j, j - gap, onSwap);
          j -= gap;
        }
      }
      gap = Math.floor(gap / 2);
    }

    return newArr;
  },
  async bubbleSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length - i - 1; j++) {
        if (newArr[j] > newArr[j + 1]) {
          await swap(newArr, j, j + 1, onSwap);
        }
      }
    }

    return newArr;
  },
  async cocktailShakerSort(
    arr: number[],
    onSwap?: SwapCallback
  ): Promise<number[]> {
    const newArr = [...arr];
    let start = 0;
    let end = newArr.length - 1;
    let swapped = true;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end; i++) {
        if (newArr[i] > newArr[i + 1]) {
          await swap(newArr, i, i + 1, onSwap);
          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }

      end--;

      for (let i = end - 1; i >= start; i--) {
        if (newArr[i] > newArr[i + 1]) {
          await swap(newArr, i, i + 1, onSwap);
          swapped = true;
        }
      }

      start++;
    }

    return newArr;
  },
  async combSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];
    const n = newArr.length;
    let gap = n;
    let shrinkFactor = 1.3;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrinkFactor);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }

      for (let i = 0; i + gap < n; i++) {
        if (newArr[i] > newArr[i + gap]) {
          await swap(newArr, i, i + gap, onSwap);
          sorted = false;
        }
      }
    }

    return newArr;
  },
  async exchangeSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];

    for (let i = 0; i < newArr.length - 1; i++) {
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[i] > newArr[j]) {
          await swap(newArr, i, j, onSwap);
        }
      }
    }

    return newArr;
  },

  async countingSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];
    const max = Math.max(...newArr);
    const min = Math.min(...newArr);
    const range = max - min + 1;
    const count: number[] = new Array(range).fill(0);
    const output: number[] = new Array(newArr.length).fill(0);

    newArr.forEach((item) => {
      count[item - min]++;
    });

    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }

    for (let i = newArr.length - 1; i >= 0; i--) {
      output[count[newArr[i] - min] - 1] = newArr[i];
      count[newArr[i] - min]--;
    }

    if (onSwap) {
      for (let i = 0; i < newArr.length; i++) {
        newArr[i] = output[i];
        onSwap([...newArr]);
        await delay(0);
      }
    }

    return output;
  },
  async radixSort(arr: number[], onSwap?: SwapCallback): Promise<number[]> {
    const newArr = [...arr];
    const max = Math.max(...newArr);
    const maxDigits = Math.floor(Math.log10(max)) + 1;

    for (let digit = 0; digit < maxDigits; digit++) {
      const buckets: number[][] = new Array(10).fill(0).map(() => []);

      for (let i = 0; i < newArr.length; i++) {
        const digitValue = Math.floor(newArr[i] / Math.pow(10, digit)) % 10;
        buckets[digitValue].push(newArr[i]);
      }

      newArr.length = 0;

      for (const bucket of buckets) {
        for (const num of bucket) {
          newArr.push(num);
          if (onSwap) {
            onSwap([...newArr]);
            await delay(0);
          }
        }
      }
    }

    return newArr;
  },
};

async function heapify(
  arr: number[],
  n: number,
  i: number,
  onSwap?: SwapCallback
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    await swap(arr, i, largest, onSwap);
    await heapify(arr, n, largest, onSwap);
  }
}
async function merge(
  left: number[],
  right: number[],
  onSwap?: SwapCallback
): Promise<number[]> {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
    if (onSwap) {
      onSwap(result.concat(left.slice(i)).concat(right.slice(j)));
    }
    await delay(0);
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
async function partition(
  arr: number[],
  low: number,
  high: number,
  onSwap?: SwapCallback
): Promise<number> {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      await swap(arr, i, j, onSwap);
    }
  }
  await swap(arr, i + 1, high, onSwap);

  return i + 1;
}

async function quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  onSwap?: SwapCallback
): Promise<void> {
  if (low < high) {
    const pi = await partition(arr, low, high, onSwap);

    await quickSortHelper(arr, low, pi - 1, onSwap);
    await quickSortHelper(arr, pi + 1, high, onSwap);
  }
}
