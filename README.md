# Full-Stack-TODO-Application-main
 A Full Stack Todo List with a clean and simple UI 

Figma Design --> https://www.figma.com/community/file/1145991068621514311


## Authors

- [Udit Sharma](https://www.github.com/uditsharma04)


## Run Locally

Download the given files and place them in same folder

## Demo installation

- Open this Repository
![1](https://github.com/UditSharma04/Batch-Systems_Assignmet/assets/109049436/a5b909bd-d2eb-4277-bdaa-4c62957be903)

- Download the provided files
![2](https://github.com/UditSharma04/Batch-Systems_Assignmet/assets/109049436/4d36040e-2be7-4307-9915-381aeb3e00ee)

- Go to the downloaded file location and extrat the zip file
![3](https://github.com/UditSharma04/Batch-Systems_Assignmet/assets/109049436/ae94af54-e773-4180-8313-84999428888b)

- Extract as follows

![4](https://github.com/UditSharma04/Batch-Systems_Assignmet/assets/109049436/8c5b1264-8cc6-4f29-bfb0-606ce0410ff5)

- Open the folder where the zip file has been extracted
![5](https://github.com/UditSharma04/Batch-Systems_Assignmet/assets/109049436/d34049a2-69a0-4876-a683-53daa99d8519)

- now open terminal for both client and server folder
   - run command in both terminals to install node modules
     ```
     npm install
     ```
- running the frontend and backend locally

in client terminal
 ```
npm run dev
```
in server terminal
 ```
npm start
```

- Now go to your browser and search this
  ```
    http://localhost:5173/
  ```
  - you will see this web page
![6](https://github.com/user-attachments/assets/8b559752-5e5c-47f7-8db1-441f6f35747b)

- Database Setup
 - Make the following table in your mysql workbench
   ![7](https://github.com/user-attachments/assets/d826567d-9b3c-4f7c-b33f-370ea2e5692b)

 - Now in the server folder open index.js and update the following part to conncect to your Mysql database
   ```
   const db = mysql.createConnection({
    host : 'yourConnectionName',
    user : 'yourUserName',
    password : "yourWorkbenchPassword",
    database : 'yourSchemaName'
   })
   ```
   example
   ```
   const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "Udit@2002",
    database : 'sys'
   })
   ```
Now the local installation is complet u can visit the localhost:5173 and use the todoList app
 

## How the webpage looks
https://github.com/user-attachments/assets/946d00cd-b3a6-426d-847b-90de264021ba






## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hellouditt/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hellouditt)

