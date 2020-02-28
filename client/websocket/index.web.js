export default __DEV__ ? 'ws://localhost:5000/api/ws' : `ws://${window.location}/api/ws`;
