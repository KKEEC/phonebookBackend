const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
const totalPerson = persons.length
const date = new Date();

// Root 
app.get('/',(request,response) =>{
    response.send('<h1>Hello! Please provide endpoint</h1>')
})

//For /info endpoint
app.get('/info', (request,response) => {
    response.send(`
    <h1>Phonebook has info for ${totalPerson} people</h1>
    <h2>${date}</h2>
    
    `)
})

//For /api/persons endpont
app.get('/api/persons', (request,response) => {
    response.json(persons)
})


//For getting user with id
app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

//For deleting a USer

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
  })

//For adding a user POST
app.use(express.json())


app.post('/api/persons',(request,response) =>{
    const body = request.body
    const matchName = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or Number missing'
        })
    }
    if(matchName){
        return response.status(400).json({
            error: ' broo nem musta b uniq'
        })
    }else{
        const person = {
            name: body.name,
            number: body.number,
            id:Math.floor(Math.random() * 20),
            }
        persons = persons.concat(person)
        response.json(person)
    }
})



const PORT = 3001
app.listen(PORT, () => {console.log(`App is running on port ${PORT}`)})