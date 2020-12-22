const fs = require('fs');
const chalk = require('chalk');

const errorMsg = chalk.bgRed;
const alertMsg = chalk.blue.inverse;
const successMsg = chalk.bgGreen;

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
};

const isTitleExists = (notes, title) => !!(notes.find((note) => note.title === title));

const addNote = (title, body) => {
    const notes = loadNotes();

    if (isTitleExists(notes, title)) {
        console.log(errorMsg(` A note with title: '${title}' already exists! `));
    } else {
        notes.push({
            title,
            body,
        });

        saveNotes(notes);

        console.log(successMsg(' New note added '));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    if (isTitleExists(notes, title)) {
        saveNotes(notes.filter((note) => note.title !== title));

        console.log(alertMsg(` Note with title: '${title}' removed `));
    } else {
        console.log(errorMsg(` No note with title: '${title}' found`));
    }
};

const listNotes = () => {
    const notes = loadNotes();

    if (notes && notes.length > 0) {
        console.log(alertMsg('Your notes:'));
        notes.forEach((note) => {
            console.log(alertMsg(` title: '${note.title}', body: '${note.body}' `));
        });
    } else {
        console.log(errorMsg(' No notes found'));
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((el) => el.title === title);

    if (note) {
        console.log(alertMsg(` title: '${note.title}', body: '${note.body}' `));
    } else {
        console.log(errorMsg(` No note with title: '${title}' found`));
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote,
};
