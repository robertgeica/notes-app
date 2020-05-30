const chalk = require('chalk')
const fs = require('fs');

const getNotes = () => {
    return 'Get notes: ';


}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'));

    notes.forEach((note) => {
        console.log(note.title);
    })

}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => title === note.title)

    if(note) {
        console.log(chalk.inverse(`Note to read: ${note.title} by ${note.body}`));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Duplicate title taken!'));
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const keepNotes = notes.filter(note => note.title !== title)

    if(notes.length > keepNotes.length) {
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
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
        console.log('error: ', e);
        return []
    }

    
}

module.exports = {getNotes, addNote, removeNote, listNotes, readNote}

