const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt")
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const userModel = require('./models/user.model')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        return userModel.findOne({ email })
            .then(result => {
                const user = result[0]
                if (user && bcrypt.compareSync(password, user.password)) {
                    const { id, email, realname } = user
                    return cb(null, { id, email, realname }, { message: 'Logged In Successfully' });
                }
                return cb(null, false, { message: 'Incorrect email or password.' });

            })
            .catch(err => cb(err));
    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
},
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return userModel.findOneById(jwtPayload.id)
            .then(result => {
                const { id, email, realname } = result[0]
                return cb(null, { id, email, realname });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

module.exports = passport;
