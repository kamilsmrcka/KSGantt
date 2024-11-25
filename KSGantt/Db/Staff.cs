namespace KSGantt.Db
{
    public class Staff : BaseObject
    {
        public string Name { get; set; }

        public Category Category { get; set; }

        public double WorkingFactor { get; set; } = 1;
    }
}
