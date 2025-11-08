import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useId } from "react";
import styles from "./checkbox.module.css";

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "size"> {
	label?: string;
	error?: string;
	helperText?: string;
	size?: "sm" | "md" | "lg";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, error, helperText, size = "md", className, id, disabled: isDisabled, ...props }, ref) => {
		const generatedId = useId();
		const checkboxId = id || generatedId;
		const hasError = Boolean(error);

		const checkboxClassName = clsx(
			styles.checkbox,
			styles[`checkbox--${size}`],
			hasError && styles["checkbox--error"],
			isDisabled && styles["checkbox--disabled"],
			className
		);

		return (
			<div className={styles.checkboxWrapper}>
				<div className={styles.checkboxContainer}>
					<input
						aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
						aria-invalid={hasError}
						className={checkboxClassName}
						disabled={isDisabled}
						id={checkboxId}
						ref={ref}
						type="checkbox"
						{...props}
					/>
					{label && (
						<label className={styles.label} htmlFor={checkboxId}>
							{label}
							{props.required && <span className={styles.required}>*</span>}
						</label>
					)}
				</div>
				{error && (
					<p className={styles.errorText} id={`${checkboxId}-error`} role="alert">
						{error}
					</p>
				)}
				{helperText && !error && (
					<p className={styles.helperText} id={`${checkboxId}-helper`}>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

Checkbox.displayName = "Checkbox";
