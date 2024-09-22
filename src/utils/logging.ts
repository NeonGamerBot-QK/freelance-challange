import fs from "fs" 
const stamp = Date.now()
export default function logging(log: string) {
    console.debug(`[LOG] `+log)
fs.appendFileSync(`log-${stamp}.txt`, log + "\n")
}
console.log = logging;