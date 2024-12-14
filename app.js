
const express = require('express');
const mongoose=require("mongoose");
const articleRoutes = require('./routes/articleRoute');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './notification.proto';
const dotenv=require("dotenv")
const cors=require("cors")
// Initialisation de l'application Express
const app = express();
dotenv.config()
app.use(cors())

// Middleware pour parser le JSON
app.use(express.json());

// Charger les routes
app.use('/api/articles', articleRoutes);

// ---- Configuration du serveur gRPC ----
// Charger le fichier proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

// Démarrer le serveur gRPC
const grpcServer = new grpc.Server();

grpcServer.addService(notificationProto.NotificationService.service, {
    notifyStockChange: (call) => {
        console.log('Client connecté pour recevoir des notifications de stock.');

        // Exemple d'envoi de notifications toutes les 5 secondes
        setInterval(() => {
            const stockUpdate = {
                articleId: '123',
                newStock: Math.floor(Math.random() * 100),
            };
            call.write(stockUpdate);
        }, 5000);
    }
});

// Lancer le serveur gRPC
grpcServer.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on 127.0.0.1:50051');
    grpcServer.start();
});
//connexion a la base de données
mongoose.connect(process.env.DATABASE)
.then(()=>console.log("connexion à la base de données réussie"))
.catch(err=>{console.log("erreur de connexio à la base de donnÃ©es",err)
process.exit()
})


app.listen(process.env.PORT,()=>{
    console.log(`server is listen on port ${process.env.port}`)
})
module.exports = app;




