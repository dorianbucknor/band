import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import { AppBar, Box, Drawer } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Stages,
	Bands,
	Feed,
	Friends,
	Chats,
	Settings,
} from "../../components/index";

export default function index() {
	const [contIdx, setContIdx] = useState(0);

	const router = useRouter();
	let { tab } = router.query;
	let content = {
		feed: <Feed />,
		stages: <Stages />,
		bands: <Bands />,
		friends: <Friends />,
		chats: <Chats />,
		settings: <Settings />,
	};
	let metaDesc = {
		feed: "",
		stages: "",
		bands: "",
		friends: "",
		chats: "",
		settings: "",
	};
	useEffect(() => {
		// console.log(router);
		return () => {};
	}, []);
	return (
		<div className={styles.container}>
			<Head>
				<title>Band</title>
				<meta name="description" content={metaDesc[tab]} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.left}>
					<Link href="/app/">
						<div className={styles.logoContainer}>
							<img
								src="https://vistapointe.net/images/band-1.jpg"
								alt=""
								className={styles.logo}
							/>
						</div>
					</Link>
					<nav className={styles.navbar}>
						<Link href="/app/feed">
							<div className={styles.navbar__btn}>
								<ion-icon name="newspaper"></ion-icon>
								{/* <ion-icon name="home"></ion-icon> */}
								<p>Feed</p>
							</div>
						</Link>
						<Link href="/app/stages">
							<div className={styles.navbar__btn}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 473.3 438"
									className={styles.navPngIcon}
								>
									<title>Stages</title>
									<g id="Layer_2" data-name="Layer 2">
										<g id="Layer_1-2" data-name="Layer 1">
											<rect
												x="117.3"
												y="408"
												width="240"
												height="30"
											/>
											<path d="M236.65,0,0,102H.3V402h473V102ZM404.3,132h39v62h-39Zm0,82h39v43h-39Zm0,63h39v43h-39ZM69.3,382h-39V340h39Zm0-62h-39V277h39Zm0-63h-39V214h39Zm0-63h-39V132h39Zm305,178H99.3V132h275Zm69,10h-39V340h39Z" />
										</g>
									</g>
								</svg>
								<p>Stages</p>
							</div>
						</Link>
						<Link href="/app/bands">
							<div className={styles.navbar__btn}>
								<ion-icon name="musical-notes"></ion-icon>
								<p>Bands</p>
							</div>
						</Link>
						<Link href="/app/friends">
							<div className={styles.navbar__btn}>
								<ion-icon name="people"></ion-icon>
								<p>Friends</p>
							</div>
						</Link>
						<Link href="/app/chats">
							<div className={styles.navbar__btn}>
								<ion-icon name="chatbubbles"></ion-icon>
								<p>Chats</p>
							</div>
						</Link>
						<Link href="/app/settings">
							<div className={styles.navbar__btn}>
								<ion-icon name="settings"></ion-icon>
								<p>Settings</p>
							</div>
						</Link>
					</nav>
				</div>
				<div className={styles.center}>
					<div className={styles.centerContent}>{content[tab]}</div>
				</div>
				<div className={styles.right}>
					<div className={styles.menu}></div>
				</div>
			</main>
		</div>
	);
}
