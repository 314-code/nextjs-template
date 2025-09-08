"use client";

import { useState } from "react";

export const ManualErrorComponent: React.FC = () => {
	const [shouldError, setShouldError] = useState(false);

	if (shouldError) {
		throw new Error("Manual test error triggered!");
	}

	return (
		<div className="rounded border border-gray-300 p-4">
			<h3>Manual Error Test</h3>
			<button
				onClick={() => setShouldError(true)}
				className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
			>
				Trigger Error
			</button>
		</div>
	);
};
