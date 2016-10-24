import path from 'path'
import snap from './index'

export default function () {
  const file = process.argv[2]

  snap(file).then(sum => {
    console.log(`Analyzing ${path.resolve(file)}...`)
    console.log('Sum:  ', sum.sum)
    console.log('Size: ', sum.size)
  }).catch(err => {
    console.error('Error:', err.message || err)
  })
}
