using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Server.WebSocketManager
{
    public class ClientSocket
    {
        public string Id { get; set; }
        public string StationId { get; set; }
        public WebSocket WebSocket { get; set; }
    }

    public class ConnectionManager
    {
        private readonly ConcurrentDictionary<string, ClientSocket> _sockets =
            new ConcurrentDictionary<string, ClientSocket>();

        public ClientSocket GetSocketById(string id)
        {
            return _sockets.FirstOrDefault(p => p.Key == id).Value;
        }

        public ConcurrentDictionary<string, ClientSocket> GetAll()
        {
            return _sockets;
        }

        public string GetId(WebSocket socket)
        {
            return _sockets.FirstOrDefault(p => p.Value.WebSocket == socket).Key;
        }

        public void AddSocket(string id, string stationId, WebSocket socket)
        {
            var clientSocket = new ClientSocket {Id = id, StationId = stationId, WebSocket = socket};
            _sockets.TryAdd(CreateConnectionId(), clientSocket);
        }

        public async Task RemoveSocket(string id)
        {
            _sockets.TryRemove(id, out var clientSocket);

            await clientSocket.WebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure,
                "Closed by the ConnectionManager",
                CancellationToken.None);
        }

        private static string CreateConnectionId()
        {
            return Guid.NewGuid().ToString();
        }
    }
}