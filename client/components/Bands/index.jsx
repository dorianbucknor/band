import React, { useState } from "react";
import Band from "../Band";
import BandWindow from "../BandWindow";
import styles from "./index.module.css";

function Bands() {
	const [activeBand, setActiveBand] = useState(null);
	const [selectedBand, setSelectedBand] = useState(null);
	const [bands, setStages] = useState([
		{ bid: 1, name: "Band 1" },
		{ bid: 2, name: "Band 2" },
		{ bid: 3, name: "Band 3" },
		{ bid: 4, name: "Band 4" },
		{ bid: 5, name: "Band 5" },
		{ bid: 6, name: "Band 6" },
		{ bid: 7, name: "Band 7" },
		{ bid: 8, name: "Band 8" },
		{ bid: 1, name: "Band 1" },
		{ bid: 2, name: "Band 2" },
		{ bid: 3, name: "Band 3" },
		{ bid: 4, name: "Band 4" },
		{ bid: 5, name: "Band 5" },
		{ bid: 6, name: "Band 6" },
		{ bid: 7, name: "Band 7" },
		{ bid: 8, name: "Band 8" },
	]);

	return (
		<div className={styles.container}>
			{activeBand ? (
				<></>
			) : (
				<div className={styles.main}>
					<div className={styles.actionsContainer}>
						<h2>Bands</h2>
						<div>
							<div className={styles.action}>Create Band</div>
							<div className={styles.action}>Add Band</div>
						</div>
					</div>
					<div className={styles.bandList}>
						<BandWindow
							band={selectedBand}
							setBand={setSelectedBand}
						/>
						{bands.map((value, idx) => (
							<Band
								key={idx}
								getBand={setSelectedBand}
								band={value}
								bid={value?.bid}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Bands;
