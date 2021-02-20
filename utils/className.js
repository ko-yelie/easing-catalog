export function className(...args) {
  const classNames = []
  args.forEach(arg => {
    switch (typeof arg) {
      case 'string':
        if (!!arg) {
          classNames.push(arg)
        }
        break
      case 'object':
        Object.keys(arg).forEach((key) =>{
          if (!!arg[key]) {
            classNames.push(key)
          }
        })
        break
    }
  })
  return classNames.join(' ')
}
