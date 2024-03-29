const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)  => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.bgGreen('New Note Added'));
    }
    else{
        console.log(chalk.red.inverse('Note title Taken!'));
    }
};


const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
};

const readNote = (title) => {
        const notes = loadNotes();
        const noteToRead = notes.find((note) => note.title === title)
    
        if(noteToRead){
            console.log(noteToRead.title)
            console.log(noteToRead.body)
        } else{
            console.log(chalk.red.inverse('Note not found !'))
        }
    }
          

const removeNote = (title) => {
        const notes = loadNotes();
        const notesToKeep = notes.filter((note) => note.title !== title);
        if(notesToKeep.length !== notes.length){
            console.log(chalk.green.inverse('Note Removed'));
            saveNotes(notesToKeep);
        } else {
            console.log(chalk.red.inverse('Note title taken !'));
        }
    }

const listNotes = () => {
        const notes = loadNotes()
    
        console.log(chalk.inverse('Your notes'))
    
        notes.forEach((note) => {
            console.log(note.title)
        })
}

module.exports = {
    addNote: addNote,
    readNote: readNote,
    removeNote:removeNote,
    listNotes:listNotes,
};
