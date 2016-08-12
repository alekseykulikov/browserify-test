export function sum (...args) {
  return args.reduce((memo, val) => { memo += val; return memo })
}

export function odd (...args) {
  return args.reduce((memo, val) => { memo -= val; return memo })
}

export function mul (...args) {
  return args.reduce((memo, val) => { memo *= val; return memo })
}
