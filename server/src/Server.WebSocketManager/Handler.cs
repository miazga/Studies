using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Server.WebSocketManager
{
    public abstract class Handler
    {
        public Handler(ConnectionManager manager)
        {
            Manager = manager;
        }

        protected ConnectionManager Manager { get; set; }

        public virtual void OnConnected(WebSocket socket)
        {
            Manager.AddSocket(socket);
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await Manager.RemoveSocket(Manager.GetId(socket));
        }

        public async Task SendMessageAsync(WebSocket socket, string message)
        {
            if (socket.State != WebSocketState.Open)
                return;

            await socket.SendAsync(new ArraySegment<byte>(Encoding.ASCII.GetBytes(message),
                    0,
                    message.Length),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None);
        }

        public async Task SendMessageAsync(string socketId, string message)
        {
            await SendMessageAsync(Manager.GetSocketById(socketId), message);
        }

        public async Task SendMessageToAllAsync(string message)
        {
            foreach (var pair in Manager.GetAll())
                if (pair.Value.State == WebSocketState.Open)
                    await SendMessageAsync(pair.Value, message);
        }

        //TODO - decide if exposing the message string is better than exposing the result and buffer
        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}