import express from 'express'
import {ApolloServer, gql} from 'apollo-server-express'
import {PORT, DB} from './config'
import cors from 'cors'
import {typeDefs, resolvers} from './graphql'
import http from 'http'
import mongoose from 'mongoose'
import * as AppModels from './models'
import bodyParser from 'body-parser'
import {schemaDirectives} from './graphql/directives'
import Auth from './middleware/auth'
import * as socketServer from './socket'
import  {ExpressPeerServer} from 'peer'

const app = express()


app.use(bodyParser.json())
app.use(Auth)
app.use(cors({
    origin: 'http://118.71.135.237:9000',
    credentials: true
}))
const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: ({req}) => {
        let {user, isAuth} = req
        return {req, user, isAuth, ...AppModels, ...socketServer}
    }
})

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
.then(()=>console.log("Database is connected"))
.catch(err=>console.log(err))
server.applyMiddleware({
    app
})

export const httpServer = http.createServer(app)
const peerServer =  ExpressPeerServer(httpServer, {
    path: '/call-video'
})
app.use('/', peerServer)

const port = process.env.PORT || PORT
httpServer.listen(port, ()=>{
    console.log('Server started on port ' +PORT )
})
