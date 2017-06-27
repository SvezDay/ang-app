interface Configuration {
    clientID: string,
    domain: string,
    callbackURL: string,
    audience: string,
    API_URL: string
}

export const CONFIG: Configuration = {
    clientID: 'OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk',
    domain: 'svezday.eu.auth0.com',
   //  callbackURL: 'https://rud-ang-app.herokuapp.com',
    callbackURL: 'http://localhost:4200',
    audience: 'https://svezday.eu.auth0.com/userinfo',
    //  API_URL: 'https://rud-ang-api.herokuapp.com',
    API_URL: 'http://localhost:3200'
};
