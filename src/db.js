import fs from 'fs'

// crate dir
if(!fs.readdirSync('data'))
    fs.mkdirSync('data')

export default function (data){
    let files = fs.readdirSync('data')
    console.log('Save file: '+ files.length)
    return fs.writeFileSync(`data/${files.length}.txt`, data)
}
