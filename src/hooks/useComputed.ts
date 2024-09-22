import {computed, IComputedValueOptions} from "mobx";
import {DependencyList, useMemo} from "react";

export const useComputed = <T>(
  fn: () => T,
  options?: IComputedValueOptions<T>,
  deps?: DependencyList,
) => useMemo(() => computed(fn, options), deps ?? []);
