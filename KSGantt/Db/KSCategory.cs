namespace KSGantt.Db
{
    public class KSCategory : BaseObject
    {
        public string Name { get; set; }
        public KSCategory Parent { get; set; }
    }
}
