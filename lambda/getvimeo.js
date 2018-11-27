exports.handler = async (event, context) => {
    const id = event.queryStringParameters.id || "";
  
    return {
      statusCode: 200,
      body: `VIMEO ID: ${id}`
    };
  };