let notes = [
  {
    id: 1,
    title: 'first note',
    content: 'My first note is here.',
  },
  {
    id: 2,
    title: 'second note',
    content: 'My second note is here.',
  },
  {
    id: 3,
    title: 'third note',
    content: 'My third note is here.',
  },
  {
    id: 4,
    title: 'fourth note',
    content: 'My fourth note is here.',
  },
  {
    id: 5,
    title: 'fifth note',
    content: 'My fifth note is here.',
  },
];

exports.list = () => {
  return notes.map(({ id, title, content }) => ({
    id,
    title,
    content,
  }));
};

exports.get = (id) => {
  const note = notes.find((note) => note.id === id);
  if (!note) {
    throw new Error('(내가 만든 오류임) Note not found');
  }
  return note;
};

exports.create = (title, content) => {
  const { id: lastId } = notes[notes.length - 1];
  const newNote = {
    id: lastId + 1,
    title,
    content,
  };
  notes.push(newNote);
  return newNote;
};

exports.update = (id, title, content) => {
  const index = notes.findIndex((note) => note.id === id);
  if (index < 0) {
    throw new Error('(내가 만든 오류임) Note not found for update');
  }
  const note = notes[index];
  note.title = title;
  note.content = content;
  notes[index] = note;
  return note;
};

exports.delete = (id) => {
  if (!notes.some((note) => note.id === id)) {
    throw new Error('(내가 만든 오류임) Note not found for delete');
  }
  notes = notes.filter((note) => note.id !== id);
  return;
};
