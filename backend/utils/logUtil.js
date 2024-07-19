const logDetails = (message, data) => {
  if (data) {
    // Convert data to JSON string and replace \n with actual new lines
    const jsonString = JSON.stringify(data, null, 2).replace(/\\n/g, '\n');
    
    // Indent new lines properly
    const processedData = jsonString.split('\n').map((line, index) => 
      index === 0 ? line : `  ${line}`
    ).join('\n');

    console.log(message);
    console.log(processedData);
  } else {
    console.log(message);
  }
};

module.exports = logDetails;
