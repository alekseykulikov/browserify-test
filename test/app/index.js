export function sum(...args) {
  return args.reduce((memo, val) => memo += val)
}

export function odd(...args) {
  return args.reduce((memo, val) => memo -= val)
}

export function mul(...args) {
  return args.reduce((memo, val) => memo *= val)
}
