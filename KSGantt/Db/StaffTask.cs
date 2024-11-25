namespace KSGantt.Db
{
    public class StaffTask : BaseObject
    {
        public DateTime StartTime { get; set; }
        public Project Project { get; set; }
        public Staff Staff { get; set; }
        public Task Task { get; set; }
        public double HoursCount { get 
            {
              return (Staff != null && Task != null) ? Task.HoursCount/Staff.WorkingFactor : 0;
            } 
        }

    }
}
