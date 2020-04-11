using System;
using Server.Api.Models;

namespace Server.Api.Consumers
{
    public class AddResultMessage
    {
        public AddResultMessage(Guid studyId, Result result)
        {
            StudyId = studyId;
            Result = result;
        }

        public Guid StudyId { get; }
        public Result Result { get; }
    }
}