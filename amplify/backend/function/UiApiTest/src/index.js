
const SolAws = require("./SolAws")

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
            uuid: SolAws.getUserUuidFromLambda(event),
            event:event,
            context:context}),
    };
};
