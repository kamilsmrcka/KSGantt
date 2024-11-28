class KSGantt {
    constructor(containerId, startDate, daysCount, rowsCount, data) {
        this.container = document.getElementById(containerId);
        this.startDate = startDate;
        this.daysCount = daysCount;
        this.rowsCount = rowsCount;
        this.allDays = this.generateDateArray(startDate, daysCount);
        this.rows = [];
        this.data = data;
        this.init();
    }

    generateDateArray(startDate, daysCount) {
        const result = [];
        let currentDate = new Date(startDate);

        for (let i = 0; i < daysCount; i++) {
            const dayOfWeek = currentDate.getDay();
            result.push({
                day: currentDate.getDate(),
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear(),
                isWeekend: dayOfWeek === 0 || dayOfWeek === 6
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return result;
    }

    init() {
        this.namesContainer = document.createElement("div");
        this.namesContainer.className = "ks-gantt-names";
        this.container.appendChild(this.namesContainer);

        this.eventsContainer = document.createElement("div");
        this.eventsContainer.className = "ks-gantt-events";
        this.container.appendChild(this.eventsContainer);

        this.loadData(this.data);
    }

    loadData(data) {
        const row = new KSGanttRow(this.daysCount, this.allDays, true);
        this.namesContainer.appendChild(row.titleElement);
        this.eventsContainer.appendChild(row.rowElement);


        data.forEach(obj => {
            const row = new KSGanttRow(this.daysCount, this.allDays, false, obj);
            this.rows.push(row);
            this.namesContainer.appendChild(row.titleElement);
            this.eventsContainer.appendChild(row.rowElement);
        });


    }
}

class KSGanttRow {
    constructor(daysCount, allDays, isTitle = false, data) {
        this.title = isTitle ? "" : data.staff.name;
        this.data = isTitle ? [] : data;
        this.daysCount = daysCount;
        this.allDays = allDays;
        this.isTitle = isTitle;
        this.tasks = [];
        this.init();
    }

    init() {
        this.titleElement = document.createElement("div");
        this.titleElement.className = "ks-gantt-row-title";
        this.titleElement.innerText = this.title;

        this.rowElement = document.createElement("div");
        this.rowElement.className = "ks-gantt-row";
        this.rowElement.style.width = `${this.daysCount * 242}px`;

        for (const day of this.allDays) {
            const dayObj = new KSGanttDay(day, this.isTitle);
            this.rowElement.appendChild(dayObj.element);
        }

        if (!this.isTitle) {
            const task = new KSGanttTask(this.data);
            this.tasks.push(task);
            this.rowElement.appendChild(task.element);
        }
    }
}

class KSGanttDay {
    constructor(dayData, isTitle = false) {
        this.dayData = dayData;
        this.isTitle = isTitle;
        this.element = document.createElement("div");
        this.element.className = "ks-gantt-day";

        if (this.isTitle) {
            const headTitle = document.createElement("div");
            headTitle.className = "ks-gantt-day-head";

            if (this.dayData.isWeekend)
                headTitle.classList.add("weekend");

            headTitle.setAttribute("data-day", `${this.dayData.day}.${this.dayData.month}.${this.dayData.year}`)
            headTitle.innerText = `${this.dayData.day}.${this.dayData.month}.${this.dayData.year}`;
            this.element.appendChild(headTitle);
        } else {
            for (let hour = 0; hour < 24; hour++) {
                const hourElement = document.createElement("div");
                hourElement.className = "ks-gantt-hour";
                if (hour > 7 && hour < 16) {
                    hourElement.classList.add("wrk");
                }
                this.element.appendChild(hourElement);
            }
        }
    }
}

class KSGanttTask {
    constructor(data) {
        this.title = data.task.name;
        this.element = document.createElement("div");
        this.element.className = "ks-gantt-task";
        this.data = data;

        var date = this.formatDate(this.data.startDate);
        var titleElement = document.querySelector(`.ks-gantt-day-head[data-day="${date}"]`);
        var taskX = titleElement.getBoundingClientRect().left - titleElement.parentNode.parentNode.getBoundingClientRect().left;
        this.element.style.left = `${taskX}px`;

        var ceilDays = Math.ceil(data.hoursCount / 8);
        this.element.style.width = `${ceilDays * 242}px`;

        const taskTitle = document.createElement("div");
        taskTitle.className = "ks-gantt-task-title";
        taskTitle.innerText = this.title;

        this.element.style.backgroundColor = this.data.task.color;
        this.element.appendChild(taskTitle);

        this.enableDragAndResize();
    }

    formatDate(isoDate) {

        const dateObj = new Date(isoDate);

        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        return `${day}.${month}.${year}`;
    }

    enableDragAndResize() {
        const move = (ev) => {
            this.element.style.left = `${this.element.offsetLeft + ev.movementX}px`;
        };

        const resize = (ev) => {
            const newWidth = this.element.offsetWidth + ev.movementX;
            if (newWidth > 10) {
                this.element.style.width = `${newWidth}px`;
            }
        };

        const updateCursor = (ev) => {
            const rect = this.element.getBoundingClientRect();
            const offsetRight = rect.right - ev.clientX;
            this.element.style.cursor = offsetRight <= 10 ? "ew-resize" : "move";
        };

        const dragStart = (ev) => {
            const rect = this.element.getBoundingClientRect();
            const offsetRight = rect.right - ev.clientX;

            this.element.dataset.isResizing = offsetRight <= 10 ? "true" : "false";
            this.element.dataset.isDragging = offsetRight > 10 ? "true" : "false";
            this.element.setPointerCapture(ev.pointerId);
        };

        const drag = (ev) => {
            if (this.element.dataset.isResizing === "true") {
                resize(ev);
            } else if (this.element.dataset.isDragging === "true") {
                move(ev);
            }
        };

        const dragEnd = (ev) => {
            this.element.dataset.isResizing = "false";
            this.element.dataset.isDragging = "false";
            this.element.releasePointerCapture(ev.pointerId);
        };

        this.element.addEventListener("pointermove", updateCursor);
        this.element.addEventListener("pointerdown", dragStart);
        this.element.addEventListener("pointermove", drag);
        this.element.addEventListener("pointerup", dragEnd);
    }
}


window.InitKSGantt = function (data) {


    new KSGantt("ks-gantt", "2024-1-1", 30, 15, data);

}


