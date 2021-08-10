**Pre-requisite:**

* node version >=8
* npm version >=6.13
* Download the sql database and run the mysql server
* Database contains **users** table containing user credentials
* please use username: **gaurav** and password: **123456**

**Steps to run code:**

* Download the source code.
* cd source_directory and run **npm install**
* once installation of node_modules is completed run **npm start**
* The server should start up on port **8000**

**Endpoints:**

* **Login** : **http://localhost:8000/login**
  * Request-Protocol: POST
  * Body: {username:gaurav,password:123456}
  * Response: token


* **Get_date_info** : **http://localhost:8000/get_date_info**
  * Request-Protocol: POST
  * Body: {date:any_date(date)}
  * Response: data: [] containing the result


* **Get_state_info** : **http://localhost:8000/get_state_info**

  * Request-Protocol: POST
  * Body: {state:state_name(string)}
  * Response: data: [] containing the result


* **Pinpoint_state** : **http://localhost:8000/pinpoint_state**
  * Request-Protocol: POST
  * Body: {date:any_date(date),state:state_name(string)}
  * Response: data: [] containing the result
