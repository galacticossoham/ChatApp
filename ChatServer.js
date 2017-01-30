/**
 * Created by Soham Saha on 09-08-2015.
 */
var ws = require("nodejs-websocket")

var server = ws.createServer(function (conn) {
    conn.clientname = null
    console.log("New connection")
    conn.on("text", function (str) {
        if (conn.clientname === null) {
            console.log("New client enters: "+str)
            conn.clientname = str
            broadcast(str+" entered")
        } else
            broadcast(conn.clientname+" : "+str)
        console.log("Received message "+str)
    })
    conn.on("close", function (code, reason) {
        broadcast(conn.clientname+" left")
        console.log(conn.clientname+" leaves")
    })
}).listen(8001)
function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}

