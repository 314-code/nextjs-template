import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnnouncementProvider } from "../src/providers/AnnouncementProvider";
import "../src/styles/globals.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			gcTime: 10 * 60 * 1000,
		},
	},
});

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#acb",
				},
				{
					name: "dark",
					value: "#f0a",
				},
			],
		},
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<AnnouncementProvider>
					<div style={{ color: "#000" }}>
						<Story />
					</div>
				</AnnouncementProvider>
			</QueryClientProvider>
		),
	],
};

export default preview;
