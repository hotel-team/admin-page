/*
PANEL ADMINISTORA
*/


const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const zseitszyfrowanie = require('bcryptjs');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const colors = require('colors');
const app = express();
app.use(express.urlencoded({extended:false}));

// Silnik
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// Pliki cookie
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  600 * 1000 // 10 minut 
}));

// Jeżeli nie zalogowany to wyświetl stronę
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login-register');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}
// Koniec middleware'a

// Stona główna
app.get('/', ifNotLoggedin, (req,res,next) => {
    dbConnection.execute("SELECT `name` FROM `users` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('home',{
            name:rows[0].name
        });
    });
    
});
// Koniec

// Moduł logowania
app.post('/', ifLoggedin, [
    body('user_email').custom((value) => {
        return dbConnection.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Zły adres email!');
            
        });
    }),
    body('user_pass','Hasło nie może być puste!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_email} = req.body;
    if(validation_result.isEmpty()){
        
        dbConnection.execute("SELECT * FROM `users` WHERE `email`=?",[user_email])
        .then(([rows]) => {
            console.log(rows[0].password);
            zseitszyfrowanie.compare(user_pass, rows[0].password).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].id;

                    res.redirect('/');
                }
                else{
                    res.render('login-register',{
                        login_errors:['Złe hasło!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('login-register',{
            login_errors:allErrors
        });
    }
});
// Koniec modułu logowania

// Moduł wylogowywania
app.get('/logout',(req,res)=>{
    // Ususwanie sesji użytkownika
    req.session = null;
    res.redirect('/');
});
// Koniec modułu

app.use('/', (req,res) => {
    res.status(404).send('<h1>Błąd 404</h1>');
});

app.listen(3001, () => console.log("Serwer został uruchomiony...".blue));
