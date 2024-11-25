namespace KSGantt.Db
{
    public class KSTask : BaseObject
    {
        public string Name { get; set; }
        public KSCategory Category { get; set; }

        public double HoursCount { get; set; }

    }
}
