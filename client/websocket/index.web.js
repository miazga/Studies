export default __DEV__ ? 'ws://localhost:5100/api/ws' : `ws://${window.location}/api/ws`;
