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
        const rows = datagrid.querySelectorAll(datagridHierarchy.join(" > "));

        rows.forEach(row => {
            console.log(row.children[0].innerHTML);
        })
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
