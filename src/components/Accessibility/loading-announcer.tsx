"use client";
import { useCallback, useEffect } from "react";
import { useAnnouncement } from "@/providers/AnnouncementProvider";

type StatusType = "loading" | "success" | "error";

type LoadingAnnouncerProps = {
	status: StatusType;
	loadingMessage?: string;
	completedMessage?: string;
	errorMessage?: string;
	delay?: number;
};

export const LoadingAnnouncer = ({
	status,
	completedMessage = "Content loaded",
	errorMessage = "Error loading content",
	loadingMessage = "Loading content",
	delay,
}: LoadingAnnouncerProps) => {
	const { announce, announceWithDelay } = useAnnouncement();

	const handleLoadingStatus = useCallback(() => {
		switch (status) {
			case "loading":
				return announceWithDelay(loadingMessage, delay);
			case "error":
				return announce(errorMessage);
			case "success":
				return announce(completedMessage);
			default:
				return;
		}
	}, [announce, announceWithDelay, loadingMessage, errorMessage, completedMessage, delay, status]);

	useEffect(() => {
		handleLoadingStatus();
	}, [handleLoadingStatus]);

	return null;
};
