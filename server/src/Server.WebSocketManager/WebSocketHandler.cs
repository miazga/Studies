using System.Net.WebSockets;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Server.WebSocketManager
{
    public abstract class WebSocketHandler
    {
        public WebSocketHandler(ConnectionManager manager)
        {
            Manager = manager;
        }

        protected ConnectionManager Manager { get; set; }

        public virtual void OnConnected(string id, string stationId, WebSocket socket)
        {
            Manager.AddSocket(id, stationId, socket);
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await Manager.RemoveSocket(Manager.GetId(socket));
        }

        public async Task SendMessageAsync(WebSocket socket, object message)
        {
            if (socket.State != WebSocketState.Open)
                return;

            await socket.SendAsync(
                JsonSerializer.SerializeToUtf8Bytes(message,
                    new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase}),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None);
        }

        public async Task SendMessageAsync(string socketId, object message)
        {
            await SendMessageAsync(Manager.GetSocketById(socketId).WebSocket, message);
        }

        public async Task SendMessageToAllAsync(string id, string stationId, object message)
        {
            foreach (var (_, value) in Manager.GetAll())
                if (value.Id == id && value.StationId == stationId && value.WebSocket.State == WebSocketState.Open)
                    await SendMessageAsync(value.WebSocket, message);
        }

        //TODO - decide if exposing the message string is better than exposing the result and buffer
        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}