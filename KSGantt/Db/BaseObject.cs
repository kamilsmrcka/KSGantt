namespace KSGantt.Db
{
    public class BaseObject
    {
        public BaseObject()
        {
            Id = Guid.NewGuid();
            CreateDate = DateTime.Now;
        }
        public Guid Id { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
