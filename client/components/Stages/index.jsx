import React, { useState } from "react";
import Stage from "../Stage";
import StageWindow from "../StageWindow";
import styles from "./index.module.css";

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

	return (
		<div className={styles.container}>
			{activeStage ? (
				<></>
			) : (
				<div className={styles.main}>
					<div className={styles.actionsContainer}>
						<div className={styles.action}>Create Stage</div>
						<div className={styles.action}>Add Stage</div>
					</div>
					<div className={styles.stageList}>
						<StageWindow
							stage={selectedStage}
							setStage={setSelectedStage}
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
