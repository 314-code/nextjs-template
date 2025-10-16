"use client";

import chalk from "chalk";
import { createContext, type ReactNode, useCallback, useContext, useRef } from "react";

type AnnouncementPriority = "polite" | "assertive";

type AnnouncementContextType = {
	announce: (message: string, priority?: AnnouncementPriority) => void;
	announceWithDelay: (message: string, delay?: number, priority?: AnnouncementPriority) => void;
};

const AnnouncementContext = createContext<AnnouncementContextType | null>(null);

export const AnnouncementProvider = ({ children }: { children: ReactNode }) => {
	const politeRef = useRef<HTMLOutputElement>(null);
	const assertiveRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout>(null);

	const announce = useCallback((message: string, priority: AnnouncementPriority = "polite") => {
		const targetRef = priority === "assertive" ? assertiveRef : politeRef;

		if (targetRef.current) {
			targetRef.current.textContent = "";

			setTimeout(() => {
				if (targetRef.current) {
					targetRef.current.textContent = message;
				}
			}, 100);
		}
	}, []);

	const announceWithDelay = useCallback(
		(message: string, delay: number = 1000, priority: AnnouncementPriority = "polite") => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				announce(message, priority);
			}, delay);
		},
		[announce]
	);

	return (
		<AnnouncementContext.Provider value={{ announce, announceWithDelay }}>
			{children}

			<output aria-atomic="true" aria-live="polite" className="sr-only" ref={politeRef} />
			<div aria-atomic="true" aria-live="assertive" className="sr-only" ref={assertiveRef} role="alert" />
		</AnnouncementContext.Provider>
	);
};

export const useAnnouncement = () => {
	const context = useContext(AnnouncementContext);

	if (!context) {
		throw new Error(
			`${chalk.blueBright("useAnnouncement")} must be used within ${chalk.redBright("AnnouncementProvider")}`
		);
	}

	return context;
};
