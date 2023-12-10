import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import gen from './gen.js'
import send from './send.js'
import reforge from './reforge.js'

yargs(hideBin(process.argv))
    .command('gen', '🔥 Generate cover letters for selected offers', () => {}, (argv) => {
        gen()
    })
    .demandCommand(1)
    .command('send <num>', '✅ Approve option', () => {}, (argv) => {
        if (!!argv.num && typeof argv.num === "number"){
            send(argv.num)
        }
        else{
            console.log('❌ Invalid')
        }
    })
    .command('reforge <num>', '♻ Regenerate option', () => {}, (argv) => {
        if (!!argv.num && typeof argv.num === "number"){
            reforge(argv.num)
        }
        else{
            console.log('❌ Invalid')
        }
    })
    .parse()
