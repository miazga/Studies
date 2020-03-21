using System;
using System.Threading.Tasks;
using MassTransit;
using Server.Api.Persistence;
using Server.Api.RealTimeUpdates;

namespace Server.Api.Consumers
{
    public class AddResultConsumer : IConsumer<AddResultMessage>
    {
        private readonly IStudiesRepository _repository;
        private readonly RealTimeUpdateHub _realTimeUpdateHub;

        public AddResultConsumer(IStudiesRepository repository, RealTimeUpdateHub realTimeUpdateHub)
        {
            _repository = repository;
            _realTimeUpdateHub = realTimeUpdateHub;
        }
        
        public async Task Consume(ConsumeContext<AddResultMessage> context)
        {
            var study = await _repository.AddResultAsync(context.Message.StudyId, context.Message.Result);
            if (study == null) return;

            await _realTimeUpdateHub.Notify(context.Message.StudyId, context.Message.Result);
        }
    }
}