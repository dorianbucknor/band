import React, { useEffect, useState } from "react";
import StageWindow from "../BandWindow";
import styles from "./index.module.css";

export default function Stage({ sid, stage, getStage }) {
	const [canEdit, setCanEdit] = useState(false);
	const [editMade, setEditMade] = useState(false);
	const [edits, setEdits] = useState(null);

	useEffect(() => {
		if (stage) {
			if (stage?.admins?.includes()) {
				setCanEdit(true);
			}
			if (" " !== JSON.stringify(stage)) {
				setEditMade(true);
			}
		}
		return () => {};
	}, [stage]);

	return (
		<div
			className={styles.container}
			onClick={() => {
				if (typeof getStage === "function") {
					getStage(stage);
				}
			}}
		>
			<div
				className={styles.stageBox}
				style={{
					backgroundImage:
						stage?.picture ||
						"url(https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg)",
				}}
			>
				{/* <img
						src={
							stage?.picture ||
							"https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg"
						}
						alt="Stage Picture"
					/> */}
				<div>
					<h3>{stage?.name || "Stage Name"}</h3>
					<p>{stage.desc || "Description"}</p>
				</div>
			</div>
		</div>
	);
}
