# Control Finance Setup 
This documentation explains the basics of control Finance API basic setup 

## Step by Step

instal the dependencies 

``npm i``

paste .env.example content inside a .env file. User 

    ```

        DATABASE_URL="postgresql://" //database URL used for migrations setup
        DIRECT_URL="postgresql://" //database URL used for fastest database connections
        HOST = "127.0.0.1" //explains the host by default uses localhost
        PORT = 2333 //aplication port
        SALT = 23334575656 // salt used for password hashing methods 
        JWT_SECRET = "ControlFInanceV2API" //Jwt secred used for JWT notation in the entire aplication
        NODE_ENV = "DEV" // node mode
        API_VERSION = 1.0.1.0 // useless 
        API_ROOT = "./src"  //useless 
        API_NAME = "ControlFInanceV2API" //useless 
 
    ```

Run the Aplication

``npm run dev``