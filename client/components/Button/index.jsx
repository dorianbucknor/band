import React from "react";
import styles from "./index.module.css";

export default function Button({
	text,
	subText,
	startIcon,
	horizontalButton,
	shrink,
	children,
	endIcon,
}) {
	return (
		<div
			className={styles.button}
			style={{
				flexDirection: horizontalButton ? "row" : "column",
				width: shrink ? "1.4rem" : "max-content",
			}}
		>
			{startIcon}
			<div className={styles.buttonText}>
				<p>{text}</p>
				<sub>{subText}</sub>
			</div>
			{children}
			{endIcon}
		</div>
	);
}
