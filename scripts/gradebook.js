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
