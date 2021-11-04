import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import io from "socket.io-client";

export default function StageWindow({ stage, setStage }) {
	const [windowOpen, setWindowOpen] = useState(false);
	const router = useRouter();

	const deleteStage = () => {};
	const saveEdits = () => {};

	useEffect(() => {
		setWindowOpen(stage !== null);
	}, [windowOpen, stage]);

	return (
		<div
			className={styles.window}
			style={{ display: windowOpen ? "flex" : "none" }}
		>
			<div className={styles.topbar}>
				<h3>{stage?.name || "Stage Title"}</h3>
				<div
					className={styles.closeWindow}
					onClick={() => {
						if (typeof setStage === "function") setStage(null);
					}}
				>
					<ion-icon name="close-circle"></ion-icon>
				</div>
			</div>
			<div
				className={styles.main}
				// onClick={(e) => e.stopPropagation()}
			></div>
			<div className={styles.bottombar}>
				<Link href={`/app/stages?stage=${stage?.sid}`}>
					<div
						className={styles.bottombar__btn}
						
					>
						Join
					</div>
				</Link>
				<div className={styles.bottombar__btn}>
					Edit || Save Changes
				</div>
				<div className={styles.bottombar__btn}>Delete</div>
				<div
					className={styles.bottombar__btn}
					onClick={() => {
						if (typeof setStage === "function") setStage(null);
					}}
				>
					Cancel
				</div>
			</div>
		</div>
	);
}
