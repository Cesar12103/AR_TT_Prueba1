// let APP_ID = "dcdd57c3fdc44663a85177d1784951ed";

// let token = null;
// let uid = String(Math.floor(Math.random()*10000))

// let client;
// let channel;

// // Función que iniciará todo el proceso
// let localStream;
// let remoteStream;
// let Connection;

// const servers = {
//     iceServers:[
//         {
//             urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
//         }
//     ]
// }

// // Función para solicitar permisos de cámara y micrófono
// let init = async () => {

//     client = await AgoraRTM.createInstance(APP_ID)
//     await client.login({uid, token})

//     //index.html?room = 1234
//     channel = client.createChannel('main')
//     await channel.join()

//     channel.on('MemberJoined', handleUserJoined)
//     channel.on('MemberLeft', handleUserLeft)

//     client.on('Message From Peer', handleMessageFromPeer)


//     navigator.mediaDevices.enumerateDevices()
//   .then(devices => {
//     let obsVirtualCameraId;
//     devices.forEach(device => {
//       if (device.kind === 'videoinput' && device.label.includes('Integrated Camera')) {
//         obsVirtualCameraId = device.deviceId;
//       }
//     });
    
//     if (obsVirtualCameraId) {
//       navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: obsVirtualCameraId } }, audio: false })
//         .then(stream => {
//           localStream = stream;
//           // Aquí puedes agregar el código para manejar el stream, como mostrarlo en un video element
//           const videoElement = document.querySelector('video');
//           videoElement.srcObject = stream;
//         })
//         .catch(error => {
//           console.error('Error accessing OBS Virtual Camera:', error);
//         });
//     } else {
//       console.error('Integrated Camera not found');
//     }
//   })
//   .catch(error => {
//     console.error('Error enumerating devices:', error);
//   });

//     // localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
//     document.getElementById('user-1').srcObject = localStream

// }

// let handleUserLeft = (MemberId) => {
//     document.getElementById('user-2').style.display = 'none'
//     document.getElementById('user-1').classList.remove('smallFrame')
// }

// let handleMessageFromPeer = async (message, MemberID) => {

//     message = JSON.parse(message.text)

//     if(message.type === 'offer'){
//         createAnswer(MemberID, message.offer)
//     }

//     if(message.type === 'answer'){
//         addAnswer(message.answer)
//     }

//     if(message.type === 'candidate'){
//         if(Connection){
//             Connection.addIceCandidate(message.candidate)
//         }
//     }
// }
//hola

// let handleUserJoined = async (MemberID) => {
//     console.log('A new user joined the channel:', MemberID)
//     createOffer(MemberID)
// }


// let createPeerConnection = async (MemberID) => {

//     Connection = new RTCPeerConnection(servers)

//     remoteStream = new MediaStream()
//     document.getElementById('user-2').srcObject = remoteStream

    

//     if(!localStream){
//         localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
//         document.getElementById('user-1').srcObject = localStream
//     }

//     localStream.getTracks().forEach((track) => {
//         Connection.addTrack(track, localStream)
//     })

//     Connection.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track)
//         })
//     }

//     Connection.onicecandidate = async (event) => {
//         if(event.candidate){
//             client.sendMessageToPeer({text:JSON.stringify({'type':'candidate','candidate': event.candidate})}, MemberID)
//         }
//     }

// }


// // Se crean las funciones para establecer la comunicación mediante una interface (connection) 
// // que almacena la información de la comunicación entre uno y otro

// let createOffer = async (MemberID) => {

//     await createPeerConnection(MemberID)

//     let offer = await Connection.createOffer()
//     await Connection.setLocalDescription(offer)

//     client.sendMessageToPeer({text:JSON.stringify({'type':'offer','offer': offer})}, MemberID)
// }

// let createAnswer = async (MemberID, offer) => {

//     await createPeerConnection(MemberID)

//     await Connection.setRemoteDescription(offer)

//     let answer = await Connection.createAnswer()
//     await Connection.setLocalDescription(answer)

//     client.sendMessageToPeer({text:JSON.stringify({'type':'answer','answer': answer})}, MemberID)
    
// }

// let addAnswer = async (answer) => {
//     if(!Connection.currentRemoteDescription){
//         Connection.setRemoteDescription(answer)
//     }
// }

// let leaveChannel = async() => {
//     await channel.leave()
//     await client.logout()
// }

// window.addEventListener('beforeunload', leaveChannel)

// init()



// let APP_ID = "dcdd57c3fdc44663a85177d1784951ed"


// let token = null;
// let uid = String(Math.floor(Math.random() * 10000))

// let client;
// let channel;

// let queryString = window.location.search
// let urlParams = new URLSearchParams(queryString)
// let roomId = urlParams.get('room')

// if(!roomId){
//     window.location = 'lobby.html'
// }

// let localStream;
// let remoteStream;
// let peerConnection;

// const servers = {
//     iceServers:[
//         {
//             urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
//         }
//     ]
// }


// let constraints = {
//     video:{
//         width:{min:640, ideal:1920, max:1920},
//         height:{min:480, ideal:1080, max:1080},
//     },
//     audio:true
// }

// let init = async () => {
//     client = await AgoraRTM.createInstance(APP_ID)
//     await client.login({uid, token})

//     channel = client.createChannel(roomId)
//     await channel.join()

//     channel.on('MemberJoined', handleUserJoined)
//     channel.on('MemberLeft', handleUserLeft)

//     client.on('MessageFromPeer', handleMessageFromPeer)

//     localStream = await navigator.mediaDevices.getUserMedia(constraints)
//     document.getElementById('user-1').srcObject = localStream
// }
 

// let handleUserLeft = (MemberId) => {
//     document.getElementById('user-2').style.display = 'none'
//     document.getElementById('user-1').classList.remove('smallFrame')
// }

// let handleMessageFromPeer = async (message, MemberId) => {

//     message = JSON.parse(message.text)

//     if(message.type === 'offer'){
//         createAnswer(MemberId, message.offer)
//     }

//     if(message.type === 'answer'){
//         addAnswer(message.answer)
//     }

//     if(message.type === 'candidate'){
//         if(peerConnection){
//             peerConnection.addIceCandidate(message.candidate)
//         }
//     }


// }

// let handleUserJoined = async (MemberId) => {
//     console.log('A new user joined the channel:', MemberId)
//     createOffer(MemberId)
// }


// let createPeerConnection = async (MemberId) => {
//     peerConnection = new RTCPeerConnection(servers)

//     remoteStream = new MediaStream()
//     document.getElementById('user-2').srcObject = remoteStream
//     document.getElementById('user-2').style.display = 'block'

//     document.getElementById('user-1').classList.add('smallFrame')


//     if(!localStream){
//         localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
//         document.getElementById('user-1').srcObject = localStream
//     }

//     localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream)
//     })

//     peerConnection.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track)
//         })
//     }

//     peerConnection.onicecandidate = async (event) => {
//         if(event.candidate){
//             client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
//         }
//     }
// }

// let createOffer = async (MemberId) => {
//     await createPeerConnection(MemberId)

//     let offer = await peerConnection.createOffer()
//     await peerConnection.setLocalDescription(offer)

//     client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId)
// }


// let createAnswer = async (MemberId, offer) => {
//     await createPeerConnection(MemberId)

//     await peerConnection.setRemoteDescription(offer)

//     let answer = await peerConnection.createAnswer()
//     await peerConnection.setLocalDescription(answer)

//     client.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId)
// }


// let addAnswer = async (answer) => {
//     if(!peerConnection.currentRemoteDescription){
//         peerConnection.setRemoteDescription(answer)
//     }
// }


// let leaveChannel = async () => {
//     await channel.leave()
//     await client.logout()
// }

// let toggleCamera = async () => {
//     let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

//     if(videoTrack.enabled){
//         videoTrack.enabled = false
//         document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
//     }else{
//         videoTrack.enabled = true
//         document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
//     }
// }

// let toggleMic = async () => {
//     let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')

//     if(audioTrack.enabled){
//         audioTrack.enabled = false
//         document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
//     }else{
//         audioTrack.enabled = true
//         document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
//     }
// }
  
// window.addEventListener('beforeunload', leaveChannel)

// document.getElementById('camera-btn').addEventListener('click', toggleCamera)
// document.getElementById('mic-btn').addEventListener('click', toggleMic)

// init()

// Agregar cambio de camara 

let APP_ID = "dcdd57c3fdc44663a85177d1784951ed";

let token = null;
let uid = String(Math.floor(Math.random() * 10000));

let client;
let channel;

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');

if (!roomId) {
    window.location = 'lobby.html';
}

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
};

let constraints = {
    video: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 }
    },
    audio: true
};

let init = async () => {
    client = await AgoraRTM.createInstance(APP_ID);
    await client.login({ uid, token });

    channel = client.createChannel(roomId);
    await channel.join();

    channel.on('MemberJoined', handleUserJoined);
    channel.on('MemberLeft', handleUserLeft);

    client.on('MessageFromPeer', handleMessageFromPeer);

    await getCameras();
};

let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none';
    document.getElementById('user-1').classList.remove('smallFrame');
};

let handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);

    if (message.type === 'offer') {
        createAnswer(MemberId, message.offer);
    }

    if (message.type === 'answer') {
        addAnswer(message.answer);
    }

    if (message.type === 'candidate') {
        if (peerConnection) {
            peerConnection.addIceCandidate(message.candidate);
        }
    }
};

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId);
    createOffer(MemberId);
};

let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
    document.getElementById('user-2').style.display = 'block';

    document.getElementById('user-1').classList.add('smallFrame');

    if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        document.getElementById('user-1').srcObject = localStream;
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, MemberId);
        }
    };
};

let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, MemberId);
};

let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId);

    await peerConnection.setRemoteDescription(offer);

    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, MemberId);
};

let addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer);
    }
};

let leaveChannel = async () => {
    await channel.leave();
    await client.logout();
};

let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video');

    if (videoTrack.enabled) {
        videoTrack.enabled = false;
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)';
    } else {
        videoTrack.enabled = true;
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)';
    }
};

let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find(track => track.kind === 'audio');

    if (audioTrack.enabled) {
        audioTrack.enabled = false;
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)';
    } else {
        audioTrack.enabled = true;
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)';
    }
};

let getCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    const cameraSelect = document.getElementById('camera-select');
    videoDevices.forEach((device, index) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${index + 1}`;
        cameraSelect.appendChild(option);
    });

    cameraSelect.addEventListener('change', async () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        const selectedDeviceId = cameraSelect.value;
        localStream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedDeviceId } },
            audio: constraints.audio
        });
        document.getElementById('user-1').srcObject = localStream;
    });

    // Automatically select the first camera if available
    if (videoDevices.length > 0) {
        cameraSelect.value = videoDevices[0].deviceId;
        const event = new Event('change');
        cameraSelect.dispatchEvent(event);
    }
};

window.addEventListener('beforeunload', leaveChannel);

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('camera-btn').addEventListener('click', toggleCamera);
    document.getElementById('mic-btn').addEventListener('click', toggleMic);

    init();
});

