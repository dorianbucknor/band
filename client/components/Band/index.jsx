import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Band({ bid, band, getBand }) {
	const [canEdit, setCanEdit] = useState(false);
	const [editMade, setEditMade] = useState(false);
	const [edits, setEdits] = useState(null);

	useEffect(() => {
		if (band) {
			if (band?.admins?.includes()) {
				setCanEdit(true);
			}
			if (" " !== JSON.stringify(band)) {
				setEditMade(true);
			}
		}
		return () => {};
	}, [band]);

	return (
		<div
			className={styles.container}
			onClick={() => {
				if (typeof getBand === "function") {
					getBand(band);
				}
			}}
		>
			<div
				className={styles.bandBox}
				style={{
					backgroundImage:
						band?.picture ||
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
					<h3>{band?.name || "Stage Name"}</h3>
					<p>{band.desc || "Description"}</p>
				</div>
			</div>
		</div>
	);
}
