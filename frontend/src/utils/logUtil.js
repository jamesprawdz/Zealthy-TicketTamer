const logDetails = (message, data) => {
  if (data) {
    const jsonString = JSON.stringify(data, null, 2).replace(/\\n/g, "\n");

    const processedData = jsonString
      .split("\n")
      .map((line, index) => (index === 0 ? line : `  ${line}`))
      .join("\n");

    console.log(message);
    console.log(processedData);
  } else {
    console.log(message);
  }
};

export default logDetails;
