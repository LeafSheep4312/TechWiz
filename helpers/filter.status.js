module.exports = (query) => {
    let filterStatus= [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Planned",
            status: "Planned",
            class: ""
        },
        {
            name: "In Progress",
            status: "In Progress",
            class: ""
        },
        {
            name: "Completed",
            status: "Completed",
            class: ""
        }
    ];

    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class= "active";
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class= "active";
    }
    return filterStatus;
}