// import passport from 'passport';
// import {jwtConfig} from '../config/database-config'
// import {JwtStrategy,ExtractJwt} from 'passport-jwt'
// import LocalStrategy from 'passport-local'
// import bcrypt from 'bcryptjs'
// import {verifyAccount, findAccountById} from '../tables/account-table'



// // local strategy 
// const localOptions = {usernameField: 'email'}
// const localLogin = new LocalStrategy(localOptions, async (email,password,done)=>{
//     try{
//         const account = await verifyAccount(email);
//         if(account.error){
//             throw account.error
//         }
//         const match = await bcrypt.compare(password,account.password)
//         // if the password is incorrect
//         if(!match){
//             throw {error:'invalid credentials'}
//         }
//         return account
//     }catch(error){
//         return error
//     }
// })

// // setup options for JWT
// const jwtOptions = {
//     // where the token is going to be contained
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     // the secret key
//     secretOrKey: jwtConfig
// }

// // jwt strategy
// const jwtLogin = new JwtStrategy(jwtOptions, async(payload,done)=>{
//     try{
//         const account = await findAccountById()
//         // if account doesn't exist
//         if(account.length===0){
//             // we're not sending back a user => false
//             return done(null,false)
//         }
//         // else return the account
//         done(null,account)
//     }catch(error){
//         done(error, false)
//     }
// })

// // tells passport to use these strategies
// passport.use(jwtLogin)
// passport.use(localLogin)