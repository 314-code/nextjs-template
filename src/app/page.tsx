import { Loader } from "@/components/shared";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Loader size="medium" />
		</div>
	);
}
