const SolAws = {

  getUserUuidFromLambda: function(event) {
      if(
        event
        && 'requestContext' in event
        && 'identity' in event.requestContext
        && 'cognitoAuthenticationProvider' in event.requestContext.identity
      ) {
        var authParts = event.requestContext.identity.cognitoAuthenticationProvider.split(':')
        if(
          authParts.length > 1
          && authParts[authParts.length - 2] == 'CognitoSignIn'
          && authParts[authParts.length - 1].match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/)
        ) {
          return authParts[authParts.length - 1]
        }
      }
      return ''
    }

}

module.exports = SolAws