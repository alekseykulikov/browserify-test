export default class SilentReporter {
  constructor () {
    this.total = 0
    this.pass = 0
  }
  report (prefix, data) { // Won't suppress from output when erroring
  }
  finish () {
  }
}
