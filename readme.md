# MySongList-server

Backend app for [MySongList](https://github.com/Besufikad17/MySongList) made by using [nodejs](https://nodejs.org/en/), [express](https://expressjs.com/) and [prisma](https://www.prisma.io/).

## Installation

1. Clonning the repo
   
   ```bash
    git clone https://github.com/Besufikad17/MySongList-server.git
   ```

2. Installing npm packages
   
   ```bash
    cd MySongList-server && npm install
    ```
3. Connecting database
   
   ```bash
   // creaing .env file
   touch .env
   ```
   ```.env
   // storing DB url in .env file
   DATABASE_URL = "DB_URL"
   ```
4. Building 

    ```bash
    npm run build
    ```

5. Running
    ```bash 
    npm start
    ```

## Usage

  base-url : https://mysonglist-server.onrender.com/api/

  ### Endpoints

  | Endpoint   | Request type | Body/Params                                                                    | Response                                                    | Route       |
|------------|--------------|--------------------------------------------------------------------------------|-------------------------------------------------------------|-------------|
| AddSong    | POST         | Body = { url: string, title: string, artist: string }                          | {    success: boolean,   data: JSON,   error: JSON }        | /add        |
| GetSongs   | GET          |                                                                                | {    success: boolean,   data: Array<JSON>,   error: JSON } | /all        |
| UpdateSong | PUT          | Param = { id: string },  Body = { url: string, title: string, artist: string } | {    success: boolean,   data: JSON,   error: JSON }        | /update/:id |
| DeleteSong | DELETE       | Param = { id: string }                                                         | {    success: boolean,   data: JSON,   error: JSON }        | /delete/:id |