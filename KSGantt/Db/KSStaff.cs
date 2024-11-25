namespace KSGantt.Db
{
    public class KSStaff : BaseObject
    {
        public string Name { get; set; }

        public KSCategory Category { get; set; }

        public double WorkingFactor { get; set; } = 1;
    }
}
