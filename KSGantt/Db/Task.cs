namespace KSGantt.Db
{
    public class Task : BaseObject
    {
        public string Name { get; set; }
        public Category Category { get; set; }

        public double HoursCount { get; set; }

    }
}
