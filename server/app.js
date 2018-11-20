const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');


const app = express();


// allows cross origin request
app.use(cors());

//connect to mlab database
const url = `mongodb://oliver96:kelechi96@ds033400.mlab.com:33400/nodeproject1`;
mongoose.connect(url, {useNewUrlParser: true});
mongoose.connection.once('open', () =>{
    console.log('connected to a database');
});

// graph endpoint, adding schema and allow testing
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// declearing port to listen to
app.listen(4000,()=>{
    console.log('now listening for request on port 4000')
});

