const superAgent = require('superagent')
const request = require('request')
const fs = require('fs')
const { domainURI, filenameURI } = require('../utils/tool')

const main = async downloadUrl => {
  let data = await superAgent.get(downloadUrl)
  data = data.text

  let domain = domainURI(downloadUrl)

  let regex = /url\(\'{0,1}\"{0,1}(.*?)\'{0,1}\"{0,1}\)/gim

  let urls = []
  let url = ''
  while ((url = regex.exec(data))) {
    url = `${domain}${url[1]}`
    urls.push(url)
  }
  await downloadAssets(urls, domain)
}

const downloadAssets = async (urls, domain) => {
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i]
    let filename = filenameURI(url)
    if (filename) {
      await saveFile(url, filename, domain)
    }
  }
}

const saveFile = (url, filename, domain) => {
  console.log(url)
  return new Promise((resolve, reject) => {
    let writeStream = request(url).pipe(
      fs.createWriteStream(`./data/${filename}`)
    )
    writeStream.on('finish', () => {
      resolve(filename)
    })
  })
}

module.exports = main
