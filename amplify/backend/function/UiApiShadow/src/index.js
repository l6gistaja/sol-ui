
 var AWS = require('aws-sdk'); // Doesn't work with Node 18, use 16 instead! 
 var iotdata = new AWS.IotData({endpoint: process.env.ENDPOINT});
 
 /**
  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
  */
 exports.handler = async (event) => {
 
     let data;
     
     await new Promise(function(resolve, reject) {
         const params = { thingName: 'test123' };
         iotdata.getThingShadow(params, function(err, data) {
             if (err){
                 console.log(err, err.stack); 
                 reject(Error(err));
             }
             else {
                 resolve(data);
             }        
         });
     });
     
     return {
         statusCode: 200,
         headers: {
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "*"
         },
         body: JSON.stringify(data)
     };
 };
