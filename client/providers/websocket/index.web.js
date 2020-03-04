export default __DEV__
  ? 'localhost:5100/hubs/realtimeupdates'
  : `${window.location.hostname}/hubs/realtimeupdates`;
