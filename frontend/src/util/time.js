const epochToHumanReadable = (timestamp) => {
  // ChatGPT generated function
  const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  
  return `${formattedDate} ${formattedTime}`;
  // return (new Date(timestamp)).toString()
}

export {
  epochToHumanReadable
}
