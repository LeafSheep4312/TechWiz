// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length >0){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;

        });
    });
}
//End Button Status

//Form seach
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;

        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
//End Form seach

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", ()=> {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
//End pagination


//Change Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = document.querySelector("input[name='checkall']");
    const inputIds = document.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", ()=>{
        if(inputCheckAll.checked){
            inputIds.forEach(input => {
                input.checked = true;
            });
        }
        else{
            inputIds.forEach(input => {
                input.checked = false;
            });
        }
    });
    
    

    inputIds.forEach(input =>{
        input.addEventListener("click", ()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputIds.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        });
    });

    
}
//End Change Multi

//Form Chage Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if(typeChange=="delete-all"){
            const isConfirm = confirm("Ban co chac muon xoa khong");
            if(!isConfirm){
                return;
            }
        }

        if(inputChecked.length>0){
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            let idArr = [];
            inputChecked.forEach(input => {
                idArr.push(input.value);
            });

            inputIds.value = idArr.join(", ");
            formChangeMulti.submit();
        }
        else{
            alert("Please choose one at least");
        }
        


    });
}
//End Form Chage Multi


//Alert 
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    console.log(time);
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
}


//Upload image
const uploadImage =document.querySelector("[upload-image]");

if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]"); 
    uploadImageInput.addEventListener("change", (e)=> {
        console.log(e);
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })   
}
//End Upload image


//Sort
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });

    //Add selected for option
    const ke = url.searchParams.get("sortKey");
    const val = url.searchParams.get("sortValue");

    if(ke&&val){
        const stringSort = `${ke}-${val}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected=true;
    }

}
//End sort