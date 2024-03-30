export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const userId = searchParams.get("userId");
	return Response.json({ status: 201, message: "Course Added" });
}
