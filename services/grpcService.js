const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './notification.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

const grpcClient = new notificationProto.NotificationService('127.0.0.1:50051', grpc.credentials.createInsecure());

exports.notifyStockChange = (articleId, newStock) => {
    const call = grpcClient.notifyStockChange();
    call.write({ articleId, newStock });
    call.end();
};
