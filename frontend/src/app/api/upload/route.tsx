import { BlobServiceClient } from "@azure/storage-blob";
import { QueueServiceClient } from "@azure/storage-queue";

const connectionString = process.env.BLOB_CONNECTION_STRING; // Your connection string

export async function POST(req: Request) {
	const formData = await req.formData();
	const file = formData.get("file");
	if (!file) {
		return Response.json({ status: 400, message: "No FIle Uploaded" });
	}

	const blobServiceClient =
		BlobServiceClient.fromConnectionString(connectionString);

	const containerName = "learnblocks";

	const containerClient = blobServiceClient.getContainerClient(containerName);

	const fileName = `${Date.now().toString()}${file.name}`;

	const blockBlobClient = containerClient.getBlockBlobClient(fileName);
	const options = { blobHTTPHeaders: { blobContentType: file.type } };

	const fileData = await file.arrayBuffer();
	const uploadResponse = await blockBlobClient.uploadData(fileData, options);

	return Response.json({
		url: `https://mafiahackstorage.blob.core.windows.net/learnblocks/${encodeURI(
			fileName
		)}`,
		status: 201,
	});
}
