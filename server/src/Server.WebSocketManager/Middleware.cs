using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Server.WebSocketManager
{
    public class Middleware
    {
        private readonly RequestDelegate _next;

        public Middleware(RequestDelegate next,
            Handler handler)
        {
            _next = next;
            Handler = handler;
        }

        private Handler Handler { get; }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
                return;

            var socket = await context.WebSockets.AcceptWebSocketAsync();
            Handler.OnConnected(socket);

            await Receive(socket, async (result, buffer) =>
            {
                if (result.MessageType == WebSocketMessageType.Text)
                    await Handler.ReceiveAsync(socket, result, buffer);

                else if (result.MessageType == WebSocketMessageType.Close)
                    await Handler.OnDisconnected(socket);
            });
            await _next.Invoke(context);
        }

        private async Task Receive(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer),
                    CancellationToken.None);

                handleMessage(result, buffer);
            }
        }
    }
}