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

        const hScrollContainer = document.querySelector(".ks-gantt-events");
        hScrollContainer.addEventListener("wheel", function (e) {
            if (e.deltaY > 0) {
                hScrollContainer.scrollLeft += 100;
                e.preventDefault();
            }
            else {
                hScrollContainer.scrollLeft -= 100;
                e.preventDefault();
            }
        });

        this.createGroups();
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
                isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`
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

    afterDrop(taskID, staffID, taskData, currentDay) {
        var staffRows = document.querySelectorAll(`.ks-gantt-row[data-staff-id="${staffID}"]`);
        var lastStaffRow = staffRows[staffRows.length - 1];
        var workingFactor = lastStaffRow.getAttribute("data-staff-workingfactor");

        var headRows = document.querySelectorAll(`.ks-gantt-row-title[data-id="${staffID}"]`);
        var lastHeadRow = headRows[headRows.length - 1];


        var data = [];
        data.startDateISO = currentDay;
        data.task = taskData;
        data.hoursCount = data.task.hoursCount / workingFactor;

        const task = new KSGanttTask(data);

        var countOfTasks = lastStaffRow.querySelectorAll(`.ks-gantt-task`).length;


        if (countOfTasks == 0) {
            lastStaffRow.appendChild(task.element);
        } else {
            var rowData = [];
            rowData.staff = [];
            rowData.staff.id = staffID;
            rowData.staff.name = lastStaffRow.getAttribute("data-staff-name");
            rowData.staff.workingFactor = lastStaffRow.getAttribute("data-staff-workingfactor");

            const newRow = new KSGanttRow(this.daysCount, this.allDays, false, rowData);
            this.rows.push(newRow);
            lastHeadRow.after(newRow.titleElement);
            lastStaffRow.after(newRow.rowElement);

            newRow.rowElement.appendChild(task.element);
        }
        this.createGroups();
    }

    createGroups() {
        var headerRowTitles = document.querySelectorAll(".ks-gantt-row-title");
        var prevHeaderRowTitle = headerRowTitles[0];

        headerRowTitles.forEach(function (element) {
            element.classList.add("groupend");
            if (element.getAttribute("data-id") != prevHeaderRowTitle.getAttribute("data-id")) {
                element.classList.add("groupstart");
            } else {
                element.classList.remove("groupstart");
                element.innerText = "";
                prevHeaderRowTitle.classList.remove("groupend");
            }
            prevHeaderRowTitle = element;
        });

        var rowTitles = document.querySelectorAll(".ks-gantt-row");
        var prevRowTitle = rowTitles[0];

        rowTitles.forEach(function (element) {
            element.classList.add("groupend");
            if (element.getAttribute("data-staff-id") != prevRowTitle.getAttribute("data-staff-id")) {
                element.classList.add("groupstart");
            } else {
                element.classList.remove("groupstart");
                prevRowTitle.classList.remove("groupend");
            }
            prevRowTitle = element;
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
        if (!this.isTitle) {
            this.titleElement.setAttribute("data-id", this.data.staff.id);
        }

        this.rowElement = document.createElement("div");
        this.rowElement.className = "ks-gantt-row";
        this.rowElement.style.width = `${this.daysCount * 242}px`;

        if (!this.isTitle) {
            this.rowElement.setAttribute("data-staff-name", this.data.staff.name);
            this.rowElement.setAttribute("data-staff-id", this.data.staff.id);
            this.rowElement.setAttribute("data-staff-workingfactor", this.data.staff.workingFactor);
        }

        for (const day of this.allDays) {
            const dayObj = new KSGanttDay(day, this.isTitle);
            this.rowElement.appendChild(dayObj.element);
        }

        if (!this.isTitle && this.data.task != void 0) {
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
        if (this.isTitle)
            this.element.classList.add("head");
        this.element.setAttribute("data-day", this.dayData.date);

        if (this.isTitle) {
            const headTitle = document.createElement("div");
            headTitle.className = "ks-gantt-day-head";

            if (this.dayData.isWeekend)
                headTitle.classList.add("weekend");

            headTitle.setAttribute("data-day", this.dayData.date)
            headTitle.innerText = this.dayData.date;
            this.element.appendChild(headTitle);
        } else {
            for (let hour = 0; hour < 24; hour++) {
                const hourElement = document.createElement("div");
                hourElement.className = "ks-gantt-hour";

                if (!this.dayData.isWeekend && hour > 7 && hour < 16) {
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

        var date;
        if (this.data.startDateISO != void 0)
            date = this.data.startDateISO;
        else
            date = this.formatDate(this.data.startDate);

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

            this.element.isResizing = offsetRight <= 10 ? true : false;
            this.element.isDragging = offsetRight > 10 ? true : false;
            this.element.setPointerCapture(ev.pointerId);
        };

        const drag = (ev) => {
            if (this.element.isResizing) {
                resize(ev);
            } else if (this.element.isDragging) {
                move(ev);
            }
        };

        const dragEnd = (ev) => {
            this.element.isResizing = false;
            this.element.isDragging = false;
            this.element.releasePointerCapture(ev.pointerId);
        };

        this.element.addEventListener("pointermove", updateCursor);
        this.element.addEventListener("pointerdown", dragStart);
        this.element.addEventListener("pointermove", drag);
        this.element.addEventListener("pointerup", dragEnd);
    }
}


class KSGanttTaskArea {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.init();
    }
    init() {

        this.data.forEach(o => {
            var element = document.createElement("div");
            element.className = "ks-gantt-task-area-item";
            element.innerText = o.name;
            element.style.backgroundColor = o.color;
            element.setAttribute("draggable", true);
            element.setAttribute("data-id", o.id);
            this.container.appendChild(element);

            element.addEventListener('drag', (event) => {
                if (event.clientX === 0 && event.clientY === 0) return;


                const elementUnder = document.elementFromPoint(event.clientX, event.clientY);

                if (elementUnder) {
                    if (elementUnder.classList.contains('ks-gantt-hour')) {
                        var ganttNames = document.querySelectorAll(".ks-gantt-day");
                        ganttNames.forEach(o => {
                            o.classList.remove("under");

                        });
                        elementUnder.parentNode.classList.add("under");
                    } else {
                        var ganttNames = document.querySelectorAll(".ks-gantt-day");
                        ganttNames.forEach(o => {
                            o.classList.remove("under");

                        });
                    }
                }
            });
            element.addEventListener('dragend', (event) => {

                const elementUnder = document.elementFromPoint(event.clientX, event.clientY);

                if (elementUnder) {
                    if (elementUnder.classList.contains('ks-gantt-hour')) {

                        ksGantt.afterDrop(element.getAttribute("data-id"), elementUnder.parentNode.parentNode.getAttribute("data-staff-id"), o, elementUnder.parentNode.getAttribute("data-day"));
                        var ganttNames = document.querySelectorAll(".ks-gantt-day");
                        ganttNames.forEach(o => {
                            o.classList.remove("under");

                        });

                    }
                }
            });



            console.log(o);
        });

    }
} 1

var ksGantt;
window.InitKSGantt = function (data) {
    ksGantt = new KSGantt("ks-gantt", "2024-1-1", 30, 15, data);
}

window.InitKSGanttTaskArea = function (data) {
    new KSGanttTaskArea("ks-gantt-task-area", data);
}


