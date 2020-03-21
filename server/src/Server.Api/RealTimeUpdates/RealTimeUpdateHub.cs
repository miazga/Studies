using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Server.Api.Models;

namespace Server.Api.RealTimeUpdates
{
    public class RealTimeUpdateHub : Hub
    {
        public async Task Notify(Guid studyId, Result result)
        {
            await Clients.All.SendAsync("Update", studyId, result);
        }
    }
}