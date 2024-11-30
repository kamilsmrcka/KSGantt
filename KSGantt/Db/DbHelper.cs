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

            KSStaff st1b = new KSStaff() { Category = ct1, WorkingFactor = 1.1, Name = "Bagrista 1" };
            KSStaff st2b = new KSStaff() { Category = ct1, WorkingFactor = 0.9, Name = "Bagrista 2" };
            KSStaff st1p = new KSStaff() { Category = ct2, WorkingFactor = 1, Name = "Projektant 1" };
            KSStaff st2p = new KSStaff() { Category = ct2, WorkingFactor = 1.2, Name = "Projektant 2" };

            KSTask ts1b = new KSTask() { Category = ct1, HoursCount = 16, Color = "rgba(52, 82, 235,0.4)", Name = "Výkop jámy" };
            KSTask ts2b = new KSTask() { Category = ct1, HoursCount = 3, Color = "rgba(52, 235, 64,0.4)", Name = "Naložení hlíny" };
            KSTask ts3b = new KSTask() { Category = ct1, HoursCount = 34, Color = "rgba(235, 52, 52,0.4)", Name = "Výkop základů" };
            KSTask ts4b = new KSTask() { Category = ct1, HoursCount = 4, Color = "rgba(235, 134, 52,0.4)", Name = "Rozhrnutí hlíny" };

            KSTask ts1p = new KSTask() { Category = ct2, HoursCount = 3, Color = "rgba(198, 52, 235,0.4)", Name = "Zaměření jámy" };
            KSTask ts2p = new KSTask() { Category = ct2, HoursCount = 20, Color = "rgba(135, 97, 59,0.4)", Name = "Zaměření základů" };

            KSStaffTask stt1b = new KSStaffTask() { StartDate = new DateTime(2024,1,2), Project = pr, Staff = st1b, Task = ts1b };
            KSStaffTask stt2b = new KSStaffTask() { StartDate = new DateTime(2024,1,4), Project = pr, Staff = st1b, Task = ts2b };
            KSStaffTask stt3b = new KSStaffTask() { StartDate = new DateTime(2024,1,5), Project = pr, Staff = st1b, Task = ts3b };
            KSStaffTask stt4b = new KSStaffTask() { StartDate = new DateTime(2024,1,9), Project = pr, Staff = st1b, Task = ts4b };

            KSStaffTask stt1p = new KSStaffTask() { StartDate = new DateTime(2024, 1, 1), Project = pr, Staff = st1p, Task = ts1p };
            KSStaffTask stt2p = new KSStaffTask() { StartDate = new DateTime(2024, 1, 2), Project = pr, Staff = st1p, Task = ts2p };

            projects.AddRange(new[] { pr });
            categories.AddRange(new[] { ct1, ct2 });
            staffs.AddRange(new[] { st1b, st2b, st1p, st2p });
            tasks.AddRange(new[] { ts1b, ts2b, ts3b, ts4b, ts1p, ts2p });
            staffTasks.AddRange(new[] { stt1p, stt2p, stt1b, stt2b, stt3b, stt4b });




        }

    }
}
