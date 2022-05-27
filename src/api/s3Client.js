import { S3 } from "@aws-sdk/client-s3";

const region = "sgp1";
const bucketName = "brives";
const accessKeyId = "";
const secretAccessKey= "";
var spacesEndpoint = "https://sgp1.digitaloceanspaces.com";

const s3Client = new S3({
	endpoint: "https://sgp1.digitaloceanspaces.com",
	region: "sgp1",
	credentials: {
		accessKeyId: "UXAXPS3H4AP5ZDVA5N6X",
		secretAccessKey: "t2FtsvzRy1i7Bk6q6u742XsnJeEcnHgubczQdh7RLf4",
	},
});

export { s3Client };

