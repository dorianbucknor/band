// //server
// const serverPort = 9000;
// const http = require("http");
// const express = require("express");
// const app = express();

// //peerjs
// const { PeerServer } = require("peer");
// const peerServer = PeerServer({
// 	// path: "/app/stage",
// 	port: 5000,
// 	debug: true,
// });
// const server = http.createServer(peerServer);

// peerServer.on("connection", (client) => {
// 	console.log("Peer : " + client.getId() + " connected");
// });
// peerServer.on("disconnect", (client) => {
// 	console.log("Peer : " + client.getId() + " disconnected");
// });
// peerServer.on("error", (error) => {
// 	console.log(error);
// });
// app.use("/peerjs", peerServer);

// // socket.io
// const { Server } = require("socket.io");
// const io = new Server(server, { cors: {}, path:"/app/stage" });
// io.on("connection", (socket) => {
// 	console.log("Socket : " + socket.id + " connected");
// });

// server.listen(serverPort, () => {
// 	console.log("Server Ready on port:", serverPort);
// });

const express = require("express");
const cors = require("cors");
const http = require("http");
const { v4 } = require("uuid");
const { Server } = require("socket.io");
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 5000;
const { PeerServer } = require("peer");

const io = new Server(server, {
	path: "/app/stages",
	cors: {
		origin: "*",
	},
});

const peerServer = PeerServer({
	path: "/app/stages",
	port: 9000,
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/app/stages", (req, res) => {
	res.send({ link: v4() });
});

io.on("connection", (socket) => {
	console.log("socket established");
	socket.on("join-room", (userData) => {
		const { roomID, userID } = userData;
		socket.join(roomID);
		socket.to(roomID).emit("new-user-connect", userData);
		socket.on("disconnect", () => {
			socket.to(roomID).emit("user-disconnected", userID);
		});
	});
});

server
	.listen(port, () => {
		console.log(`Listening on the port ${port}`);
	})
	.on("error", (e) => {
		console.error(e);
	});
