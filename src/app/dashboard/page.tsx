import SmartErrorBoundary from "@/components/smart-error-boundary";
import { ManualErrorComponent } from "./manual-error";

export default function DashboardPage() {
	return (
		<div>
			<h1>Dashboard</h1>

			<SmartErrorBoundary context="dashboard-aside">
				{/* <aside>Aside section</aside> */}
				<ManualErrorComponent />
			</SmartErrorBoundary>
		</div>
	);
}
