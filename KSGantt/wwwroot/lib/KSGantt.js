class KSGantt {
    constructor(containerId, startDate, daysCount, rowsCount) {
        this.container = document.getElementById(containerId);
        this.startDate = startDate;
        this.daysCount = daysCount;
        this.rowsCount = rowsCount;
        this.allDays = this.generateDateArray(startDate, daysCount);
        this.rows = [];
        this.init();
    }

    generateDateArray(startDate, daysCount) {
        const result = [];
        let currentDate = new Date(startDate);

        for (let i = 0; i < daysCount; i++) {
            result.push({
                day: currentDate.getDate(),
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear()
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

        this.loadData();
    }

    loadData(data) {
        const row = new KSGanttRow("", this.daysCount, this.allDays, true);
        this.namesContainer.appendChild(row.titleElement);
        this.eventsContainer.appendChild(row.rowElement);


        for (let i = 0; i < this.rowsCount; i++) {
            const row = new KSGanttRow(`row${i}`, this.daysCount, this.allDays, false);
            this.rows.push(row);
            this.namesContainer.appendChild(row.titleElement);
            this.eventsContainer.appendChild(row.rowElement);
        }
    }
}

class KSGanttRow {
    constructor(title, daysCount, allDays, isTitle = false) {
        this.title = title;
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
            const task = new KSGanttTask("Název úlohy");
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
    constructor(title) {
        this.title = title;
        this.element = document.createElement("div");
        this.element.className = "ks-gantt-task";

        this.element.style.left = (Math.floor(Math.random() * (500 - 0 + 1) + 0)) + "px";
        this.element.style.width = (Math.floor(Math.random() * (1000 - 100 + 1) + 100)) + "px";

        const taskTitle = document.createElement("div");
        taskTitle.className = "ks-gantt-task-title";
        taskTitle.innerText = this.title;

        this.element.style.backgroundColor = ["#fc2803", "#28fc03", "#0328fc", "#fca503"][Math.floor(Math.random() * 4)];
        this.element.appendChild(taskTitle);

        this.enableDragAndResize();
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
    console.log(data);
    new KSGantt("ks-gantt", "2024-1-1", 30, 15);

}


