const { json } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))


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


//GET all persons
app.get('/api/persons', (request,response) => {
    response.json(persons)
})
 
//for info endpoint

app.get('/info', (request, response) => {
    response.send(
        `
        <h2>Phonebook has info for ${persons.length} persons</h2>
        <h3>${Date()}</h3>
        `
    )
})

//get with id number

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const checkPerson = persons.find(person => person.id === id)

    if(checkPerson){
        response.json(checkPerson)
    }else{
        response.status(404).end()
    } 
})
//Delete Person

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//Add person using post
//Using JSON parser
app.use(express.json())
morgan.token('body', (req,res) => JSON.stringify(req.body))


app.post('/api/persons', morgan(':method :url :status :res[content-length] :response-time ms :body'), (request, response) => {
    const body = request.body
    const matchName = persons.find(person => person.name === body.name)
    if(matchName){
        response.status(400).json({error: 'Person with name already exists'})

    } if(!body.name || !body.number){
        return response.status(400).json({error: 'Name or number is missing'})

        }else{

            const person = {
                name: body.name,
                number: body.number,
                id: Math.floor(Math.random() * 20)
            }  

            persons = persons.concat(person)
            response.json(person)
    }
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))