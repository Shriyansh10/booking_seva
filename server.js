import http from 'node:http'
import app from './backend/src/app.js'
import 'dotenv/config'
import connectDB from './backend/src/common/config/db.js'

const port = process.env.PORT || 8000;
const url = process.env.URL || '127.0.0.1'
async function main(){

    try{
        const server = http.createServer(app)
        const res =  await connectDB.query('SELECT NOW()');
        console.log(res)
        server.listen(port, url,() => console.log(`Server is running at Port ${port} in ${process.env.MODE} mode`))
    }catch(error){
        console.log(error);
    }
}

main()