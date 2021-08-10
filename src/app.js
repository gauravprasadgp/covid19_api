const express = require('express');
const app = express();
var cors = require('cors');
var mysql = require('mysql');
const bodyParser = require('body-parser');
// importing the auth.js to enable authentication for the api's
const auth = require('./api/auth');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// used to enable cross-origin-resource sharing for developing the api ans testing on same system/
app.use(cors());
// json web token used to send encoded token containing payload.
const jwt = require('jsonwebtoken');
// secret key to encode and decode the token
const { secret } = require('./config/secret');

//creating a connecting variable to be used withing the api's
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',//password for root user
    database: 'covid19' //database name
});
 // service
app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        //checking for username and password in the database
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username,password], function (error, results, fields) {
            if (results.length > 0) {
                // generating access token which can be send back to server in the header request for authentication
                    var token = jwt.sign(
                        { username: results.username },
                        secret,
                        { expiresIn: "10days" });
                        res.json({
                            status: 200,
                            success: true,
                            token: token
                        }) 
                        //sending back the response back to the user.
            }
            else {
                res.json({
                    status: 400,
                    success: false,
                    data: "Please check your password and try again",
                    token: "Failed to fetch"
                })
            }
        })
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
})
// api endpoint : http://localhost:8000/get_date_info
app.post('get_date_info',auth,(req,res)=>{
    var date=req.body.date;
    // performing a outer join on the three table based on date provided by user and responding back to client.
    connection.query('SELECT covid_19_india.StateUnionTerritory, covid_19_india.ConfirmedIndianNational, covid_19_india.ConfirmedForeignNational, covid_19_india.Deaths, covid_19_india.Cured, covid_19_india.Confirmed, StatewiseTestingDetails.State, StatewiseTestingDetails.TotalSamples, StatewiseTestingDetails.Negative, StatewiseTestingDetails.Positive, covid_vaccine_statewise.Updated_On, covid_vaccine_statewise.Total_Doses_Administered, covid_vaccine_statewise.Total_Sessions_Conducted, covid_vaccine_statewise.Total_Sites,  covid_vaccine_statewise.First_Dose_Administered, covid_vaccine_statewise.Second_Dose_Administered, covid_vaccine_statewise.MaleIndividuals_Vaccinated, covid_vaccine_statewise.FemaleIndividuals_Vaccinated, covid_vaccine_statewise.TransgenderIndividuals_Vaccinated, covid_vaccine_statewise.Total_Covaxin_Administered, covid_vaccine_statewise.Total_CoviShield_Administered, covid_vaccine_statewise.Total_Sputnik_V_Administered, covid_vaccine_statewise.AEFI, covid_vaccine_statewise.1845_years_Age, covid_vaccine_statewise.4560_years_Age, covid_vaccine_statewise.60_years_Age, covid_vaccine_statewise.Total_Individuals_Vaccinated FROM covid_19_india JOIN StatewiseTestingDetails ON covid_19_india.Date = StatewiseTestingDetails.Date JOIN covid_vaccine_statewise ON covid_vaccine_statewise.Updated_On =StatewiseTestingDetails.Date WHERE covid_19_india.Date=?', [date] ,function (error, results, fields) {
        if (results.length > 0) {
            res.json({
                status:200,
                data:results,
                success:true
            })
        }
    })
})
// api endpoint : http://localhost:8000/get_state_info
app.post('/get_state_info',auth,(req,res)=>{
    var state_name= req.state_name;
      // performing a outer join on the three table based on state_name provided by user and responding back to client.
    connection.query('SELECT covid_19_india.date, covid_19_india.ConfirmedIndianNational, covid_19_india.ConfirmedForeignNational, covid_19_india.Deaths, covid_19_india.Cured, covid_19_india.Confirmed, StatewiseTestingDetails.State, StatewiseTestingDetails.TotalSamples, StatewiseTestingDetails.Negative, StatewiseTestingDetails.Positive, covid_vaccine_statewise.Updated_On, covid_vaccine_statewise.Total_Doses_Administered, covid_vaccine_statewise.Total_Sessions_Conducted, covid_vaccine_statewise.Total_Sites,  covid_vaccine_statewise.First_Dose_Administered, covid_vaccine_statewise.Second_Dose_Administered, covid_vaccine_statewise.MaleIndividuals_Vaccinated, covid_vaccine_statewise.FemaleIndividuals_Vaccinated, covid_vaccine_statewise.TransgenderIndividuals_Vaccinated, covid_vaccine_statewise.Total_Covaxin_Administered, covid_vaccine_statewise.Total_CoviShield_Administered, covid_vaccine_statewise.Total_Sputnik_V_Administered, covid_vaccine_statewise.AEFI, covid_vaccine_statewise.1845_years_Age, covid_vaccine_statewise.4560_years_Age, covid_vaccine_statewise.60_years_Age, covid_vaccine_statewise.Total_Individuals_Vaccinated FROM covid_19_india JOIN StatewiseTestingDetails ON covid_19_india.StateUnionTerritory = StatewiseTestingDetails.state JOIN covid_vaccine_statewise ON covid_vaccine_statewise.State =StatewiseTestingDetails.state WHERE covid_19_india.StateUnionTerritory=?', [state_name] ,function (error, results, fields) {
        if (results.length > 0) {
            res.json({
                status:200,
                data:results,
                success:true
            })
        }
    })
})
// api endpoint : http://localhost:8000/pinpoint_state
app.post('/pinpoint_state',auth,(req,res)=>{
    var date= req.date;
    var state_name= req.state_name;
      // performing a outer join on the three table based on date ans state_name provided by user and responding back to client.
    connection.query('SELECT covid_19_india.date, covid_19_india.ConfirmedIndianNational, covid_19_india.ConfirmedForeignNational, covid_19_india.Deaths, covid_19_india.Cured, covid_19_india.Confirmed, StatewiseTestingDetails.State, StatewiseTestingDetails.TotalSamples, StatewiseTestingDetails.Negative, StatewiseTestingDetails.Positive, covid_vaccine_statewise.Updated_On, covid_vaccine_statewise.Total_Doses_Administered, covid_vaccine_statewise.Total_Sessions_Conducted, covid_vaccine_statewise.Total_Sites,  covid_vaccine_statewise.First_Dose_Administered, covid_vaccine_statewise.Second_Dose_Administered, covid_vaccine_statewise.MaleIndividuals_Vaccinated, covid_vaccine_statewise.FemaleIndividuals_Vaccinated, covid_vaccine_statewise.TransgenderIndividuals_Vaccinated, covid_vaccine_statewise.Total_Covaxin_Administered, covid_vaccine_statewise.Total_CoviShield_Administered, covid_vaccine_statewise.Total_Sputnik_V_Administered, covid_vaccine_statewise.AEFI, covid_vaccine_statewise.1845_years_Age, covid_vaccine_statewise.4560_years_Age, covid_vaccine_statewise.60_years_Age, covid_vaccine_statewise.Total_Individuals_Vaccinated FROM covid_19_india JOIN StatewiseTestingDetails ON covid_19_india.StateUnionTerritory = StatewiseTestingDetails.state JOIN covid_vaccine_statewise ON covid_vaccine_statewise.State =StatewiseTestingDetails.state WHERE covid_19_india.StateUnionTerritory=? AND covid_19_india.Date=?', [state_name,date] ,function (error, results, fields) {
        if (results.length > 0) {
            res.json({
                status:200,
                data:results,
                success:true
            })
        }
    })
})

//app running on port 8000
app.listen(8000);
