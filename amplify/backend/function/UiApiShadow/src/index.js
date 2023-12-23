
 // TODO: AWS Node.js 16 Lambda support ends in 2024-06-12 ! 
 var AWS = require('aws-sdk'); // Doesn't work with Node 18, use 16 instead! 
 var IOTDATA = new AWS.IotData({
  endpoint: process.env.ENDPOINT, 
  accessKeyId: process.env.KEYID, // This IAM user must have AWSIoTDataAccess permission policy
  secretAccessKey: process.env.SECRET
 });
 var CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" };
 
 /**
  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
  */
 exports.handler = async (event) => {
 
     let shadowValue;
     
     if(event.httpMethod == "GET") {
         await new Promise(function(resolve, reject) {
             const params = { thingName: event.queryStringParameters.thing };
             IOTDATA.getThingShadow(params, function(err, data) {
                 if (err){
                     console.log(err, err.stack);
                     reject(Error(err));
                 } else {
                     shadowValue = data;
                     resolve(data);
                 }        
             });
         });
         return { statusCode: 200, headers: CORS, body: shadowValue.payload };
     }
     
     if(event.httpMethod == "POST") {
         await new Promise(function(resolve, reject) {
            var params = {
              payload: '{"state":{"desired":'+event.body+'}}',
              thingName: event.queryStringParameters.thing
            }
            IOTDATA.updateThingShadow(params, (err, data) => {
                if (err){
                    console.log(err, err.stack);
                    reject(Error(err));
                } else {
                    shadowValue = data;
                    resolve({data});
                }
            });
         });
         return { statusCode: 200, headers: CORS, body: shadowValue.payload };
     }
     
     return { statusCode: 200, headers: CORS, body: 0 };
 };