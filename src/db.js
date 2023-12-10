import fs from 'fs'

// crate dir
if(!fs.readdirSync('data'))
    fs.mkdirSync('data')

export function save(data){
    let files = fs.readdirSync('data')
    console.log('Save file: '+ files.length)
    return fs.writeFileSync(`data/${files.length}.txt`, data)
}

export function read(record){
    return fs.readFileSync(`data/${record}.txt`, 'utf8')
}