const epochToHumanReadable = (timestamp) => {
  return (new Date(Number(timestamp))).toLocaleString()
}

export {
  epochToHumanReadable
}
