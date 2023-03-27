import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
    url: 'http://localhost:8083/auth',
    realm: 'HumanVsZombies',
    clientId: 'my-app',
  });
  
  export default keycloak;