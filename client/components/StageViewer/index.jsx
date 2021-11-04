import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router"
import io from "socket.io-client"

export default function StageViewer({ stage, stageLink }) {
    const [windowOpen, setWindowOpen] = useState(false);
    const [inMic1, setInMic1] = useState(false);
    const [inMic2, setInMic2] = useState(false);
    const [inVid1, setInVid1] = useState(false);
    const [inVid2, setInVid2] = useState(false);
    const [outAudio, setOutAudio] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [inFullScreen, setInFullScreen] = useState(false);
    const [messages, setMessages] = useState([])
    const [participants, setParticipants] = useState([])
    const [socketInstance, setSocketInstance] = useState(null)

    const router = useRouter();


    useEffect(() => {
        setWindowOpen(router.query.stage !== null);
        
            import("../Connection").then(({ default: createSocketConnectionInstance }) => {
             if (windowOpen && socketInstance === null) { 
               setSocketInstance(createSocketConnectionInstance({}, router.query.stage, router.asPath));
            }
           
            });           

            return()=>{
            }
        
    }, [windowOpen, stage, socketInstance]);


    return (
        <div
            className={styles.main}
            style={{ display: windowOpen ? "flex" : "none" }}
        >
            <div className={styles.topbar}>
                <div>
                    <h2>{stage?.name}</h2>
                    <p>{stage?.desc}</p>
                </div>
                <div></div>
            </div>
            <div className={styles.center}>
                <div
                    className={styles.screen}
                    style={{ width: chatOpen ? "80%" : "100%" }}
                    id="participant-view"
                >
                </div>
                <div
                    className={styles.stageChat}
                    style={{ width: chatOpen ? "20%" : "0%" }}
                ></div>
            </div>
            <div className={styles.bottombar}>
                <div className={styles.actionBtnSet}>
                    <p>
                        <ion-icon name="log-in"></ion-icon> 1
                    </p>
                    <div className={styles.actionBtn} onClick={() => {
                        setInVid1((prev) => !prev)
                        socketInstance?.muteUnMuteVideo();
                        console.log("dd");
                    }}>
                        {inVid1 ? (
                            <ion-icon name="videocam"></ion-icon>
                        ) : (
                            <ion-icon name="videocam-off"></ion-icon>
                        )}
                    </div>
                    <div className={styles.actionBtn} onClick={() => {
                        setInMic1((prev) => !prev)
                        socketInstance?.muteUnMuteAudio();
                    }}>
                        {inMic1 ? (
                            <ion-icon name="mic"></ion-icon>
                        ) : (
                            <ion-icon name="mic-off"></ion-icon>
                        )}
                    </div>
                </div>
                <div className={styles.actionBtnSet}>
                    <p>
                        <ion-icon name="log-in"></ion-icon> 2
                    </p>
                    <div className={styles.actionBtn} onClick={() => {
                        inVid2?.enabled = !inVid2?.enabled;
                    }}>
                        {inVid2?.enabled ? (
                            <ion-icon name="videocam"></ion-icon>
                        ) : (
                            <ion-icon name="videocam-off"></ion-icon>
                        )}
                    </div>
                    <div className={styles.actionBtn} onClick={() => {
                        inMic2?.enabled = !inMic2?.enabled;
                    }}>
                        {inMic2?.enabled ? (
                            <ion-icon name="mic"></ion-icon>
                        ) : (
                            <ion-icon name="mic-off"></ion-icon>
                        )}
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    {outAudio?.enabled ?
                        (<ion-icon name="headset"></ion-icon>) :
                        (<ion-icon name="volume-mute"></ion-icon>)}
                </div>
                <div className={styles.actionBtn} >
                    <ion-icon name="flame"></ion-icon>
                </div>
                <div
                    className={styles.actionBtn}
                    onClick={() => setChatOpen((prev) => !prev)}
                >
                    <ion-icon name="chatbubble-ellipses"></ion-icon>
                </div>
                <div className={styles.actionBtn} onClick={() => setInFullScreen((prev) => !prev)}>
                    {inFullScreen ?
                        <ion-icon name="contract"></ion-icon> :
                        <ion-icon name="expand"></ion-icon>}
                </div>
                <div className={styles.actionBtn} onClick={()=>socketInstance?.destoryConnection()}><ion-icon name="exit"></ion-icon></div>
            </div>
        </div>
    );
}
{/* <div className={styles.video1}>
                         <video controls height="100%" width="100%">
                            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
                            
                        </video>
                    </div>
                    <div className={styles.video2}>
                        <video controls height="100%" width="100%">
                            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
                            
                        </video>
                    </div>
                    <div className={styles.video4}>
                        <video controls height="100%" width="100%">
                            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />

                        </video>
                    </div>
                    <div className={styles.video5}>
                        <video controls height="100%" width="100%">
                            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />

                        </video>
                    </div> */}
{/* <div className={styles.video3}>
                        <video controls height="100%" width="100%">
                            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />

                        </video>
                    </div> */}