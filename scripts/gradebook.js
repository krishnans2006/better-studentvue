const headerHierarchy = [
    ":scope",
    ".dx-datagrid-headers",
    ".dx-datagrid-content",
    ".dx-datagrid-table",
    "tbody",
]


const datagridHierarchy = [
    ":scope",
    ".dx-datagrid-rowsview",
    ".dx-scrollable-wrapper",
    ".dx-scrollable-container",
    ".dx-scrollable-content",
    ".dx-datagrid-content",
    ".dx-datagrid-table",
    "tbody",
    "tr",
]

const script = () => {
    const assignments = document.querySelector("#AssignmentsGrid")

    if (assignments) {
        const datagrid = assignments.querySelector(":scope > .dx-datagrid");
        const headers = datagrid.querySelector(headerHierarchy.join(" > "));
        const rows = datagrid.querySelectorAll(datagridHierarchy.join(" > "));

        let myPoints = 0;
        let totalPoints = 0;

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const fields = {
                "Date": null,
                "Score Type": null,
                "Points": null,
            };
            cells.forEach(cell => {
                const describedBy = cell.getAttribute("aria-describedby");
                if (!describedBy) {
                    return;
                }
                const field = headers.querySelector(`#${describedBy} > .dx-datagrid-text-content`).innerText;
                if (field in fields) {
                    fields[field] = cell.innerText;
                }
            });

            if (fields["Score Type"] === "Raw Score") {
                const points = fields["Points"];
                if (points.includes("Possible")) {
                    return;  // skip this row
                }
                const splitPoints = points.split("/");
                myPoints += parseFloat(splitPoints[0]);
                totalPoints += parseFloat(splitPoints[1]);
            }
        })

        console.log(`My points: ${myPoints}, Total points: ${totalPoints}, Grade: ${myPoints / totalPoints * 100}%`);
    } else {
        console.log("No assignments found.");
    }
}

const content = document.querySelector("#gradebook-content");

let scriptTimer;

// Maybe use MutationObserver instead?
content.addEventListener("DOMSubtreeModified", () => {
    if (scriptTimer) {
        clearTimeout(scriptTimer);
    }
    scriptTimer = setTimeout(script, 100);
});

script();
