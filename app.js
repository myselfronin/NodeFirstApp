const yargs = require('yargs')
const notes = require('./notes')

//Customize yargs version
yargs.version('1.1.0')

//Create add  command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
});

//Create Remove Command
yargs.command({
        command: 'remove',
        description: 'Remove a note',
        builder:{
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            notes.removeNote(argv.title)
        }
    });

yargs.parse()