import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import gen from './gen.js'
import send from './send.js'
yargs(hideBin(process.argv))
    .command('gen', '🔥 Generates cover letters for selected offers', () => {}, (argv) => {
        gen()
    })
    .demandCommand(1)
    .command('send <num>', '✅ Approves the selected option', () => {}, (argv) => {
        if (!!argv.num && typeof argv.num === "number"){
            send(argv.num)
        }
        else{
            console.log('❌ Invalid')
        }
    })
    .parse()
