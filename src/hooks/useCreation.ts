import {useRef} from 'react'

/***
 * 用于只需要初始化一次的函数，如果将ref.current作为factory的返回值，会被缓存住。
 * @param factory
 * @param deps
 */
export default function useCreation<T>(factory: () => T, deps: any[]) {
  const {current} = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  })
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps
    current.obj = factory()
    current.initialized = true
  }
  return current.obj as T
}

function depsAreSame(oldDeps: any[], deps: any[]): boolean {
  if (oldDeps === deps) return true
  for (let i in oldDeps) {
    if (oldDeps[i] !== deps[i]) return false
  }
  return true
}
