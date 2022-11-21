const express = require('express')
const app = express()
const cluster = require('cluster')
const os = require('os') //it is coz to get the number of cpus or cores present inside the  processor

const numCpus = os.cpus().length
console.log(cluster.getMaxListeners());
// console.log(`there are ${numCpus} cpus/cores in the system`);

app.get('/', (req, res)=>{
    // for(let i =0; i< 1e8; i++){

    // }
    res.send(`response from server ${process.pid}`)
    cluster.worker.kill()
})

// if(cluster.isMaster){
//     for(let i =0; i<numCpu; i++){
//         cluster.fork()
//     }
// }
// else{
//     // app.listen(3000, ()=> console.log(`Running on port 3000 ${process.pid}`))
// }

if(cluster.isWorker){
    // console.log(`hii to print ${numCpus} times`);
    app.listen(3000, ()=> console.log(`Running on port 3000 ${process.pid}`))
}
else if(cluster.isMaster){
    for(i =0; i<numCpus; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`worker ${worker.process.pid} has died when the api hitted`);
        cluster.fork()
    })
}