import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import {v4} from "uuid"


const initializePeerConnection = () => {
    return new Peer(v4(), {
        host: "192.168.0.105",
        secure: false, 
        path:"/app/stages",
        port:9000,
    });
}
const initializeSocketConnection = () => {
    return openSocket("http://192.168.0.105:5000", {
        secure: true, 
        reconnection: true, 
        rejectUnauthorized: false,
        reconnectionAttempts: 10,
        path:"/app/stages"
    });
}
const socketInstance= null;
const peers = {};

class Connection {
    videoContainer = {};
    message = [];
    settings;
    streaming = false;
    myStream = {};
    myPeer;
    socket;
    myID = '';
    constructor(settings) {
        this.settings = settings;
        this.myPeer = initializePeerConnection();
        this.socket = initializeSocketConnection();
        this.initializeSocketEvents();
        this.initializePeersEvents();
    }
    initializeSocketEvents = () => {
        this.socket.on('connect', (id) => {
            console.log('socket connected', id);
        });
        this.socket.on('user-disconnected', (userID) => {
            console.log('user disconnected-- closing peers', userID);
            // peers[userID] && peers[userID].close();
            this.removeVideo(userID);
        });
        this.socket.on('disconnect', () => {
            console.log('socket disconnected --');
        });
        this.socket.on('error', (err) => {
            console.log('socket error --', err);
        });
    }
    initializePeersEvents = () => {
        this.myPeer.on('open', (id) => {
            this.myID = id;
            const roomID = window.location.pathname.split('/')[2];
            const userData = {
                userID: id, roomID
            }
            console.log('peers established and joined room', userData);
            this.socket.emit('join-room', userData);
            this.setNavigatorToStream();
        });
        this.myPeer.on('error', (err) => {
            console.log('peer connection error', err);
            this.myPeer.reconnect();
        })
    }
    setNavigatorToStream = () => {
        this.getVideoAudioStream().then((stream) => {
            if (stream) {
                this.myStream = stream;
                this.streaming = true;
                this.createVideo({ id: this.myID, stream });
                this.setPeersListeners(stream);
                this.newUserConnection(stream);
            }
        })
    }
    getVideoAudioStream = (video=true, audio=true) => {
        console.log(navigator);
        let quality = this.settings.params?.quality;
        if (quality) quality = parseInt(quality);
        const myNavigator = navigator?.mediaDevices?.getUserMedia || 
        navigator?.mediaDevices?.webkitGetUserMedia || 
        navigator?.mediaDevices?.mozGetUserMedia || 
        navigator?.mediaDevices?.msGetUserMedia;
        return myNavigator({
            video: video ? {
                frameRate: quality ? quality : 12,
                noiseSuppression: true,
                width: {min: 640, ideal: 1280, max: 1920},
                height: {min: 480, ideal: 720, max: 1080}
            } : false,
            audio: audio,
        });
    }
    createVideo = (createObj) => {
	if (!this.videoContainer[createObj.id]) {
            this.videoContainer[createObj.id] = {
                ...createObj,
            };
            const roomContainer = document.getElementById('participant-view');
            const video = document.createElement('video');
            video.srcObject = this.videoContainer[createObj.id].stream;
            video.id = createObj.id;
            video.style.width = "100%";
            video.style.height = "auto";
            video.autoplay = true;
            if (this.myID === createObj.id) video.muted = true;
            roomContainer.append(video);
        } else {
            // @ts-ignore
            document.getElementById(createObj.id)?.srcObject = createObj.stream;
        }
	};
    setPeersListeners = (stream) => {
        this.myPeer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userVideoStream) => {console.log('user stream data', 
            userVideoStream)
                this.createVideo({ id: call.metadata.id, stream: userVideoStream });
            });
            call.on('close', () => {
                console.log('closing peers listeners', call.metadata.id);
                this.removeVideo(call.metadata.id);
            });
            call.on('error', () => {
                console.log('peer error ------');
                this.removeVideo(call.metadata.id);
            });
            peers[call.metadata.id] = call;
        });
    }
    newUserConnection = (stream) => {
        this.socket.on('new-user-connect', (userData) => {
            console.log('New User Connected', userData);
            this.connectToNewUser(userData, stream);
        });
    }
    connectToNewUser(userData, stream) {
        const { userID } = userData;
        const call = this.myPeer.call(userID, stream, { metadata: { id: this.myID }});
        call.on('stream', (userVideoStream) => {
            this.createVideo({ id: userID, stream: userVideoStream, userData });
        });
        call.on('close', () => {
            console.log('closing new user', userID);
            this.removeVideo(userID);
        });
        call.on('error', () => {
            console.log('peer error ------')
            this.removeVideo(userID);
        })
        peers[userID] = call;
    }
    removeVideo = (id) => {
        delete this.videoContainer[id];
        const video = document.getElementById(id);
        if (video) video.remove();
    }
    destoryConnection = () => {
        const myMediaTracks = this.videoContainer[this.myID]?.stream.getTracks();
        myMediaTracks?.forEach((track) => {
            track.stop();
        })
        if(socketInstance)
        socketInstance?.socket.disconnect();
        this.myPeer.destroy();
    }
    muteUnMuteAudio =()=>{
        const myMedia = document.getElementById(this.myID);
        myMedia.muted = !myMedia.muted;
    }
    muteUnMuteVideo =(mute)=>{
        const myMedia = document.getElementById(this.myID);
    }
}

export default function createSocketConnectionInstance(settings={}) {
    return socketInstance =  new Connection(settings);
}