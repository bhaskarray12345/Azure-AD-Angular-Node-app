const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const azureConfig = require('./azure.config.json')
const config = require('./config.json')

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const bearerStrategy = new BearerStrategy(azureConfig, (token, done) => {
        done(null, { }, token);
    }
);

const app = express();

app.use(express.json()); 

//enable CORS (for testing only -remove in production/deployment)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(bearerStrategy);

app.get(config.apiurl,
    passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('Validated claims: ', req.authInfo);
    
        // Service relies on the name claim.  
        res.status(200).json({employeeID: 100, name: 'Bhaskar', age: 35, designation: 'Tech Lead'});
    }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
