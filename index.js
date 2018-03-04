const program = require('commander')
const download = require('./core/download')

program
  .option('-u, --url [value]', 'Add Url')
  .parse(process.argv)

const main = async () => {
  let { url, option } = program

  if (url) {
    await download(url)
  }
  process.exit()
}

main()
