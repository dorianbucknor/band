import React, { useEffect, useState } from "react";
import { StageViewer } from "..";
import Stage from "../Stage";
import StageWindow from "../StageWindow";
import styles from "./index.module.css";
import { useRouter } from "next/router";

function Stages() {
	const [activeStage, setActiveStage] = useState(null);
	const [selectedStage, setSelectedStage] = useState(null);
	const [stages, setStages] = useState([
		{ sid: 1, name: "Stage 1" },
		{ sid: 2, name: "Stage 2" },
		{ sid: 3, name: "Stage 3" },
		{ sid: 4, name: "Stage 4" },
		{ sid: 5, name: "Stage 5" },
		{ sid: 6, name: "Stage 6" },
	]);

	const router = useRouter();

	useEffect(() => {
		if (router.query.stage) {
			const queryStages = stages.filter(
				(val) => val.sid.toString() === router.query.stage
			);
			setActiveStage(queryStages[0]);
		} else {
			setActiveStage(null);
		}
		return () => {};
	}, [router]);

	return (
		<div
			className={styles.container}
			style={{ padding: activeStage ? "0" : "1rem" }}
		>
			{activeStage ? (
				<div className={styles.viewer}>
					<StageViewer
						stage={activeStage}
						stageLink={router.asPath}
					/>
				</div>
			) : (
				<div className={styles.main}>
					<div className={styles.actionsContainer}>
						<h2>Stages</h2>
						<div>
							<div className={styles.action}>Create Stage</div>
							<div className={styles.action}>Add Stage</div>
						</div>
					</div>
					<div className={styles.stageList}>
						<StageWindow
							stage={selectedStage}
							setStage={setSelectedStage}
							stageLink={router.asPath}
						/>
						{stages.map((value, idx) => (
							<Stage
								key={idx}
								getStage={setSelectedStage}
								stage={value}
								sid={value?.sid}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Stages;
