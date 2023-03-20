const AWS = require('aws-sdk');

AWS.config.update({
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECERTACCESCKEY,
  },
  region: process.env.REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getVideos = async () => {
  try {
    const params = {
      TableName: 'videos',
    };

    const videos = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(videos.Items),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    };
  }
};

module.exports = {
  handler: getVideos,
};
