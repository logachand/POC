const express = require('express');
const app = express();
const port = 3000;

// Sample data for notes
let notes = [
  { id: 1, title: 'Note 1', content: 'This is the content of Note 1.' },
  { id: 2, title: 'Note 2', content: 'Content for Note 2.' },
];

// Middleware to parse JSON requests
app.use(express.json());


// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// GET a specific note by ID
app.get('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((n) => n.id === noteId);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// POST a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT (update) a note by ID
app.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex((n) => n.id === noteId);

  if (noteIndex !== -1) {
    const updatedNote = { ...notes[noteIndex], ...req.body };
    notes[noteIndex] = updatedNote;
    res.json(updatedNote);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// DELETE a note by ID
app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((n) => n.id !== noteId);
  res.json({ message: 'Note deleted successfully' });
});


// Crud is finsied



async function fetchData(url){
  try{
    const response=await fetch(url)

    const data=response.json()

    await new Promise(res=>{
      setTimeout(res,2000)
    })

    console.log("Processed Data from the URL",data)
    
    return data

  }
  catch(err){
    console.log('Error',err);
  }
}

async function complexAsync(){
  console.log("Start");
  console.log("Start");

  try{

    // const data1 = fetchData('http://jsonplaceholder.typicode.com/todos/1')
       const data1 = fetchData('http://localhost:3000/notes/')

    await new Promise(res=>{
      setTimeout(res,1000)

    console.log(data1);
    })


  }catch(err){
    console.log("Error in ComplexAsync :",err);
  }
  console.log("Enddddd!!!!!");
}

complexAsync();

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
