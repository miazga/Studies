export default __DEV__ ? 'ws://localhost:5100/api/ws' : `wss://${window.location}api/ws`;
