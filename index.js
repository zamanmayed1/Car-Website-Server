const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
          res.send("Node Server Is Running ")
})


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_USer_Password}@cluster0.ch8nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("Connection Success");

async function run() {
          try {
                    await client.connect();
                    const Servicecollection = client.db("GeniusCar").collection("service");
                    app.get('/service', async (req, res) => {
                              const query = {}
                              const cursor = Servicecollection.find(query);
                              const services = await cursor.toArray()
                              res.send(services)
                    })

                    app.get('/service/:id',async(req , res)=>{
                              const id = req.params.id
                              const query = {_id : ObjectId(id)}
                              const service = await Servicecollection.findOne(query)
                              res.send(service)
                    } )

                    app.post('/service' , async (req, res)=>{
                              const newService = req.body
                              console.log(newService);
                              const result = await Servicecollection.insertOne(newService);
                              res.send(result)
                    })
                    // For Delete A service
                    app.delete('/service/:id' , async (req , res) =>{
                              const id = req.params.id
                              const query = {_id : ObjectId(id)}
                              const result = await Servicecollection.deleteOne(query);
                              res.send(result)
                    })

          }
          finally {

          }

}
run().catch(console.dir);
app.listen(port, () => {
          console.log("Server Is Running ", port)
})

