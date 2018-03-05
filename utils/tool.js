function domainURI(str) {
  let reg = /^(\w+:\/\/)?([^\/]+)/i
  let domain = reg.exec(str)
  return domain[0]
}

function filenameURI(str) {
  let index = str.lastIndexOf('/')
  str = str.substring(index + 1, str.length)

  let reg = /\.(.*)/

  let filetype = ''
  if ((filetype = reg.exec(str))) {
    filetype = filetype[1]

    index = filetype.lastIndexOf('?')
    if (index > 0) {
      filetype = filetype.substring(0, index)
    }

    index = filetype.lastIndexOf('#')
    if (index > 0) {
      filetype = filetype.substring(0, index)
    }
  }

  reg = /(.*)\./

  let filename = reg.exec(str) && reg.exec(str)[1]

  if (filename && filetype) {
    return filename + '.' + filetype
  } else {
    return false
  }
}

exports.domainURI = domainURI
exports.filenameURI = filenameURI
