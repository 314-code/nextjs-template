import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-primary h-full w-full">
			<h1>Hello world</h1>

			<Link href="dashboard">Dashboard</Link>
		</div>
	);
}
