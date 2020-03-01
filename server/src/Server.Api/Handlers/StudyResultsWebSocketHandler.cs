using System.Net.WebSockets;
using System.Threading.Tasks;
using Server.WebSocketManager;

namespace Server.Api.Handlers
{
    public class StudyResultsWebSocketHandler : WebSocketHandler
    {
        public StudyResultsWebSocketHandler(ConnectionManager manager) : base(
            manager)
        {
        }

        public override Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            // TODO handle
            return Task.CompletedTask;
        }
    }
}