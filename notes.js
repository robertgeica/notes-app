const chalk = require('chalk')
const fs = require('fs');
// error when loading empty list (create file)
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.hex('f6d55c').bold('Your notes'));

    notes.forEach((note) => {
        console.log(chalk.hex('3caea3').bold(`${note.id}. ${note.t}`));
    });

}


const readNote = (id) => {
    const notes = loadNotes()
    const note = notes.find(note => id === note.id)

    if(note) {
        // console.log(chalk.inverse(`Note to read: ${note.id}. ${note.t} by \n ${note.c} \n`));
        console.log(chalk.hex('20639B').bold(`${note.id}. ${note.t}`));
        console.log(chalk.hex('3CAEA3').bold(`${note.c} \n`));

    } else {
        console.log(chalk.hex('ed553b').bold('No note found!'));
    }
}

// 20639b blue
// 3caea3 green
// f6d55c yellow
// ed553b red

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.t === title)

    if(!duplicateNote) {
        notes.push({
            id: notes.length +1,
            t: title,
            c: body
        })

        saveNotes(notes);
        // console.log(chalk.hex('3caea3').invese.bold.bgWhite('New note added!'));
        console.log(chalk.hex('3caea3').bold('New note added!'));
    } else {
        console.log(chalk.hex('ed553b').bold('Note title already exists!'));
    }
    
}

const removeNote = (id) => {
    // remove by id
    const notes = loadNotes();
    const keepNotes = notes.filter(note => note.id !== id)

    if(notes.length > keepNotes.length) {
        // set new id for remaining notes
        let newId = 1;
        keepNotes.map(obj => {
            obj.id = newId;
            newId++;
        });

        console.log(chalk.hex('3caea3').bold(`Your note is gone forever!`));
    } else {
        console.log(chalk.hex('ed553b').bold('Note not found!'));
    }

    saveNotes(keepNotes);
}



// write to file
const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

// read from file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        console.log('No file exists. Creating file..');
        return []
    }

    
}

module.exports = {addNote, removeNote, listNotes, readNote}

