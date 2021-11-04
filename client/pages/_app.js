import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {

	return (
		<>
			{" "}
			<Head>
				<script
					type="module"
					src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
				></script>
				<script
					nomodule
					src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
				></script>
				{/* <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script> */}
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
