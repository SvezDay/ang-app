interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string,
    audience: string
}

export const AUTH_CONFIG: AuthConfiguration = {
    clientID: 'OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk',
    domain: 'svezday.eu.auth0.com',
   //  callbackURL: 'https://ang-rest-graph-web.herokuapp.com',
    callbackURL: 'http://localhost:4200',
    audience: 'https://svezday.eu.auth0.com/userinfo'
};

// export const myConfig = {
//    name:'hello';
// }
