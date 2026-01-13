// import clsx from "clsx";

import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import styles from "./radio.module.css";

export interface RadioProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "size"> {
	label?: string;
	error?: string;
	helperText?: string;
	size?: "sm" | "md" | "lg";
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ label, error, helperText, size = "md", className, id, disabled: isDisabled, ...props }, ref) => {
		const generatedId = useId();
		const radioId = id || generatedId;
		const hasError = Boolean(error);

		const radioClassName = clsx(
			styles.radio,
			styles[`radio--${size}`],
			hasError && styles["radio--error"],
			isDisabled && styles["radio--disabled"],
			className
		);

		const ariaDescribedBy = () => {
			if (error) {
				return `${radioId}-error`;
			}

			if (helperText) {
				return `${radioId}-helper`;
			}

			return undefined;
		};

		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<input
						aria-describedby={ariaDescribedBy()}
						aria-invalid={hasError}
						className={radioClassName}
						disabled={isDisabled}
						id={radioId}
						ref={ref}
						type="radio"
						{...props}
					/>

					{label && (
						<label className={styles.label} htmlFor={radioId}>
							{label}
							{props.required && <span className={styles.required}>*</span>}
						</label>
					)}
				</div>

				{error && (
					<p className={styles.errorText} id={`${radioId}-error`} role="alert">
						{error}
					</p>
				)}
				{helperText && !error && (
					<p className={styles.helperText} id={`${radioId}-helper`}>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

Radio.displayName = "Radio";
