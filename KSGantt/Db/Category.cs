namespace KSGantt.Db
{
    public class Category : BaseObject
    {
        public string Name { get; set; }
        public Category Parent { get; set; }
    }
}
