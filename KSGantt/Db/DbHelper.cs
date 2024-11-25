namespace KSGantt.Db
{
    public static class DbHelper
    {
        public static List<Category> categories = new List<Category>();
        public static List<Project> projects = new List<Project>();
        public static List<Staff> staffs = new List<Staff>();
        public static List<Task> tasks = new List<Task>();
        public static List<StaffTask> staffTasks = new List<StaffTask>();

        public static void InitData()
        {
            Project pr = new Project() { Name = "Stavební firma" };

            Category ct1 = new Category() { Name = "Bagry" };
            Category ct2 = new Category() { Name = "Projektant" };

            Staff st1 = new Staff() { Category = ct1, WorkingFactor = 2, Name = "Bagrista 1" };
            Staff st2 = new Staff() { Category = ct1, WorkingFactor = 0.9, Name = "Bagrista 2" };
            Staff st3 = new Staff() { Category = ct2, WorkingFactor = 1, Name = "Projektant 1" };
            Staff st4 = new Staff() { Category = ct2, WorkingFactor = 1.2, Name = "Projektant 2" };

            Task ts1 = new Task() { Category = ct1, HoursCount = 8, Name = "Výkop jámy" };
            Task ts2 = new Task() { Category = ct1, HoursCount = 3, Name = "Naložení hlíny" };
            Task ts3 = new Task() { Category = ct2, HoursCount = 6, Name = "Sbírání podkladů" };
            Task ts4 = new Task() { Category = ct2, HoursCount = 3, Name = "Analýza" };

            StaffTask stt1 = new StaffTask() { StartTime = new DateTime(2024,1,1), Project = pr, Staff = st1, Task = ts1 };

            projects.AddRange(new[] { pr });
            categories.AddRange(new[] { ct1, ct2 });
            staffs.AddRange(new[] { st1, st2, st3, st4 });
            tasks.AddRange(new[] { ts1, ts2, ts3, ts4 });
            staffTasks.AddRange(new[] { stt1 });




        }

    }
}
