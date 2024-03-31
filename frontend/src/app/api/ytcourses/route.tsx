import axios from "axios";

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const userId = "0x7907b9e2b9Bd911f8892b2634c7B27C175f6f75D";
	const url = "http://localhost:5000/yt_process";
	const res = await axios.post(url, { code: code });

	const url2 = "http://localhost:3000/api/summary";
	const res2 = await axios.post(url2, { transcript: res });

	return Response.json({ status: 201, message: "Course Added" });
}
