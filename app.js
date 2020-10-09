#!/usr/bin/env node

const yargs = require('yargs')
const notes = require('./notes.js')

// customize yargs version
yargs.version('1.1.0')

// title and body options
const titleOptions = {
    describe: 'Note title',
    demandOption: true,
    type: 'string'
};

const bodyOptions = {
    describe: 'Note body',
    demandOption: true,
    type: 'string'
};

const idOptions = {
    describe: 'Note id',
    demandOption: true,
    type: 'Number'
};

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',

    t: titleOptions,
    c: bodyOptions,

    handler(argv) {
        notes.addNote(argv.t, argv.c)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    id: idOptions,

    handler(argv) {
        notes.removeNote(argv.id)
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',

    handler() {
        notes.listNotes()
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    id: idOptions,

    handler(argv) {
        notes.readNote(argv.id)
    }
})


yargs.parse()
