import { clsx } from "clsx";
import { createStrictClassSelector } from "@/lib/class-selectors";
import utilitiesCss from "@/styles/utilities.module.css";
import styles from "./page.module.css";

const css = createStrictClassSelector(styles);
const cssUtils = createStrictClassSelector(utilitiesCss);

export default function Home() {
	return (
		<div className={clsx(css("container"), cssUtils("fixed", `block`))}>
			<div className={css("temp-block")} style={{ backgroundColor: "var(--color-base)" }}>
				Base
			</div>
			<div className={css("temp-block")} style={{ backgroundColor: "var(--color-base-lighter)" }}>
				Lighter
			</div>
			<div className={css("temp-block")} style={{ backgroundColor: "var(--color-base-darker)" }}>
				Darker
			</div>
			<div className={css("temp-block")} style={{ backgroundColor: "var(--color-base-complement)" }}>
				Complement
			</div>
		</div>
	);
}
