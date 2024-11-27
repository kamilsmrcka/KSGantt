namespace KSGantt.Db
{
    public class KSStaffTask : BaseObject
    {
        public DateTime StartDate { get; set; }
        public KSProject Project { get; set; }
        public KSStaff Staff { get; set; }
        public KSTask Task { get; set; }
        public double HoursCount { get 
            {
              return (Staff != null && Task != null) ? Task.HoursCount/Staff.WorkingFactor : 0;
            } 
        }

    }
}
