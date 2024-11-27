namespace KSGantt.Db
{
    public static class DbHelper
    {
        public static List<KSCategory> categories = new List<KSCategory>();
        public static List<KSProject> projects = new List<KSProject>();
        public static List<KSStaff> staffs = new List<KSStaff>();
        public static List<KSTask> tasks = new List<KSTask>();
        public static List<KSStaffTask> staffTasks = new List<KSStaffTask>();

        public static void InitData()
        {
            KSProject pr = new KSProject() { Name = "Stavební firma" };

            KSCategory ct1 = new KSCategory() { Name = "Bagry" };
            KSCategory ct2 = new KSCategory() { Name = "Projektant" };

            KSStaff st1 = new KSStaff() { Category = ct1, WorkingFactor = 2, Name = "Bagrista 1" };
            KSStaff st2 = new KSStaff() { Category = ct1, WorkingFactor = 0.9, Name = "Bagrista 2" };
            KSStaff st3 = new KSStaff() { Category = ct2, WorkingFactor = 1, Name = "Projektant 1" };
            KSStaff st4 = new KSStaff() { Category = ct2, WorkingFactor = 1.2, Name = "Projektant 2" };

            KSTask ts1 = new KSTask() { Category = ct1, HoursCount = 16, Color = "rgb(192, 250, 180)", Name = "Výkop jámy" };
            KSTask ts2 = new KSTask() { Category = ct1, HoursCount = 3, Color = "rgb(250, 180, 180)", Name = "Naložení hlíny" };
            KSTask ts3 = new KSTask() { Category = ct2, HoursCount = 6, Color = "rgb(176, 177, 255)", Name = "Sbírání podkladů" };
            KSTask ts4 = new KSTask() { Category = ct2, HoursCount = 3, Color = "rgb(250, 252, 164)", Name = "Analýza" };

            KSStaffTask stt1 = new KSStaffTask() { StartTime = new DateTime(2024,1,1), Project = pr, Staff = st1, Task = ts1 };
            KSStaffTask stt2 = new KSStaffTask() { StartTime = new DateTime(2024,1,3), Project = pr, Staff = st1, Task = ts2 };
            KSStaffTask stt3 = new KSStaffTask() { StartTime = new DateTime(2024,1,2), Project = pr, Staff = st2, Task = ts2 };
            KSStaffTask stt4 = new KSStaffTask() { StartTime = new DateTime(2024,1,4), Project = pr, Staff = st3, Task = ts3 };
            KSStaffTask stt5 = new KSStaffTask() { StartTime = new DateTime(2024,1,2), Project = pr, Staff = st4, Task = ts4 };

            projects.AddRange(new[] { pr });
            categories.AddRange(new[] { ct1, ct2 });
            staffs.AddRange(new[] { st1, st2, st3, st4 });
            tasks.AddRange(new[] { ts1, ts2, ts3, ts4 });
            staffTasks.AddRange(new[] { stt1 });




        }

    }
}
