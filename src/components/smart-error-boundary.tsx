"use client";

import { useRouter } from "next/navigation";
import { ComponentType, ErrorInfo, ReactNode, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// Extended error context for logging
type ErrorContext = {
	context: string;
	retryCount: number;
	level: "component" | "page" | "app";
	timestamp: Date;
};

// Props for custom error fallback components
type CustomErrorFallbackProps = FallbackProps & {
	retryCount: number;
	maxRetries: number;
	context: string;
	level: "component" | "page" | "app";
	enableNavigation: boolean; // Add this to the fallback props too
};

// Error handler function type - using React's ErrorInfo
type ErrorHandler = (error: Error, errorInfo: ErrorInfo, context: ErrorContext) => void;

// Retry handler function type
type RetryHandler = () => void | Promise<void>;

// Reset keys type (for automatic boundary reset)
type ResetKeys = Array<string | number | boolean | null | undefined>;

// Default error fallback component props
type DefaultErrorFallbackProps = CustomErrorFallbackProps;

// Main SmartErrorBoundary props
type SmartErrorBoundaryProps = {
	children: ReactNode;
	fallback?: ComponentType<CustomErrorFallbackProps>;
	onError?: ErrorHandler;
	onRetry?: RetryHandler;
	context: string;
	level?: "component" | "page" | "app";
	maxRetries?: number;
	resetKeys?: ResetKeys;
	enableNavigation?: boolean;
	className?: string;
};

// Default error fallback component
const DefaultErrorFallback = ({
	error,
	resetErrorBoundary,
	retryCount,
	maxRetries,
	context,
	level,
	enableNavigation,
}: DefaultErrorFallbackProps) => {
	const router = useRouter();
	const canRetry = retryCount < maxRetries;

	return (
		<div className="bg-red-50 p-6 border border-red-200 rounded-lg error-boundary">
			<div className="flex items-center">
				<div className="flex-shrink-0">
					<svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="ml-3">
					<h3 className="font-medium text-red-800 text-sm">Something went wrong in {context}</h3>
					<div className="mt-2 text-red-700 text-sm">
						<p>{error.message}</p>
						{process.env.NODE_ENV === "development" && (
							<details className="mt-2">
								<summary className="cursor-pointer">Error details</summary>
								<pre className="mt-1 text-xs whitespace-pre-wrap">{error.stack}</pre>
							</details>
						)}
					</div>
					<div className="space-x-2 mt-4">
						{canRetry && (
							<button
								type="button"
								onClick={resetErrorBoundary}
								className="bg-red-100 hover:bg-red-200 px-3 py-2 rounded font-medium text-red-800 text-sm transition-colors"
							>
								Try Again ({maxRetries - retryCount} attempts left)
							</button>
						)}

						{/* Navigation buttons only shown when enableNavigation is true */}
						{enableNavigation && level === "page" && (
							<button
								type="button"
								onClick={() => router.refresh()}
								className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded font-medium text-gray-800 text-sm transition-colors"
							>
								Refresh Page
							</button>
						)}

						{enableNavigation && level === "page" && (
							<button
								type="button"
								onClick={() => router.back()}
								className="bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded font-medium text-blue-800 text-sm transition-colors"
							>
								Go Back
							</button>
						)}

						{enableNavigation && level === "app" && (
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded font-medium text-blue-800 text-sm transition-colors"
							>
								Reload Application
							</button>
						)}

						{enableNavigation && level === "app" && (
							<button
								type="button"
								onClick={() => router.push("/")}
								className="bg-green-100 hover:bg-green-200 px-3 py-2 rounded font-medium text-green-800 text-sm transition-colors"
							>
								Go Home
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

// Main SmartErrorBoundary component
const SmartErrorBoundary = ({
	children,
	fallback,
	onError,
	onRetry,
	context,
	level = "component",
	maxRetries = 3,
	resetKeys = [],
	enableNavigation = false, // Default to false
	className,
}: SmartErrorBoundaryProps) => {
	const [retryCount, setRetryCount] = useState<number>(0);

	const handleError = (error: Error, errorInfo: ErrorInfo): void => {
		const errorContext: ErrorContext = {
			context,
			retryCount,
			level,
			timestamp: new Date(),
		};

		// Log error with context
		// eslint-disable-next-line no-console
		console.error(
			`[${context}] Error:`,
			error,
			{
				...errorInfo,
				componentStack: errorInfo.componentStack || "N/A",
			},
			errorContext
		);

		// Custom error handling
		if (onError) {
			onError(error, errorInfo, errorContext);
		}

		// Report to analytics/monitoring service
		if (typeof window !== "undefined") {
			// Example with a monitoring service
			// Sentry.captureException(error, {
			//   contexts: {
			//     errorInfo: {
			//       ...errorInfo,
			//       componentStack: errorInfo.componentStack || 'N/A'
			//     },
			//     errorContext
			//   },
			//   tags: { level, context }
			// });
		}
	};

	const handleReset = (): void => {
		if (retryCount < maxRetries) {
			setRetryCount((prev) => prev + 1);
			onRetry?.();
		}
	};

	const FallbackComponent = fallback || DefaultErrorFallback;

	// Enhance fallback props with additional context
	const enhancedFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
		<FallbackComponent
			error={error}
			resetErrorBoundary={resetErrorBoundary}
			retryCount={retryCount}
			maxRetries={maxRetries}
			context={context}
			level={level}
			enableNavigation={enableNavigation} // Pass the prop to the fallback component
		/>
	);

	return (
		<div className={className}>
			<ErrorBoundary
				FallbackComponent={enhancedFallback}
				onError={handleError}
				onReset={handleReset}
				resetKeys={[...resetKeys, retryCount]}
			>
				{children}
			</ErrorBoundary>
		</div>
	);
};

export default SmartErrorBoundary;
export type { CustomErrorFallbackProps, ErrorHandler, RetryHandler, SmartErrorBoundaryProps };
