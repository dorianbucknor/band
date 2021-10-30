import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function StageWindow({ stage, setStage }) {
	const [windowOpen, setWindowOpen] = useState(false);
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
						setStage(null);
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
				<div className={styles.bottombar__btn}>Open</div>
				<div className={styles.bottombar__btn}>
					Edit || Save Changes
				</div>
				<div className={styles.bottombar__btn}>Delete</div>
				<div
					className={styles.bottombar__btn}
					onClick={() => setStage(null)}
				>
					Cancel
				</div>
			</div>
		</div>
	);
}
