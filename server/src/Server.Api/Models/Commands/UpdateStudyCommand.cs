namespace Server.Api.Models.Commands
{
    public class UpdateStudyCommand
    {
        public string Name { get; set; }
        public State State { get; set; }
    }
}