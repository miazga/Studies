export default __DEV__
  ? 'http://localhost:5100/hubs/realtimeupdates'
  : `https://${window.location.hostname}/hubs/realtimeupdates`;
