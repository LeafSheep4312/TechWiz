//Change status

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length >0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");


    buttonChangeStatus.forEach(button => {
        button.addEventListener("click" , ()=> {
            const id = button.getAttribute("data-id");
            const status=button.getAttribute("data-status");

            let statusChange;
            if(status=="Planned"){
                statusChange="In Progress";
            }
            else if(status=="In Progress"){
                statusChange="Completed";
            }
            else{
                statusChange="Planned";
            }
           
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}

// Delete item
const deleteButton = document.querySelectorAll("[delete-button]");
if(deleteButton.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("ban co chac muon xoa khong?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
            
        });
    });
}
//End Delete Item

