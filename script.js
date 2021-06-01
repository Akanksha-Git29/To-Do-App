let TC = document.querySelector(".ticket-container")
let allFilters = document.querySelectorAll(".filter")
let modalVisible = false

function loadTickets(color){
    let allTasks = localStorage.getItem("allTasks")
    if(allTasks != null){
        allTasks = JSON.parse(allTasks)
        if(color){
            // allTasks = localStorage.getItem("")
            allTasks = allTasks.filter(function(data){
                return data.priority == color;
            })
        }
        for(let i =0; i < allTasks.length;i++){
            let ticket = document.createElement("div")
            ticket.classList.add("tickets")
            ticket.innerHTML = `<div class="tickets-color tickets-color-${allTasks[i].priority}"></div>
                            <div class="tickets-id">#${allTasks[i].ticketId}</div>
                            <div class="task">${allTasks[i].task} </div>`
            TC.appendChild(ticket)
            ticket.addEventListener("click", function(e){
                if(e.currentTarget.classList.contains("active")){
                    e.currentTarget.classList.remove("active")
                }else{
                    e.currentTarget.classList.add("active")
                }
            })   
        }
    }
}

loadTickets();

// let allTasks = localStorage.getItem("allTasks")
// if(allTasks != null){
//     allTasks = JSON.parse(allTasks)
//     for(let i =0; i < allTasks.length;i++){
//         let ticket = document.createElement("div")
//         ticket.classList.add("tickets")
//         ticket.innerHTML = `<div class="tickets-color tickets-color-${allTasks[i].priority}"></div>
//                         <div class="tickets-id">#${allTasks[i].ticketId}</div>
//                         <div class="task">${allTasks[i].task} </div>
//                     </div>`
//         TC.appendChild(ticket)
//         ticket.addEventListener("click", function(e){
//             if(e.currentTarget.classList.contains("active")){
//                 e.currentTarget.classList.remove("active")
//             }else{
//                 e.currentTarget.classList.add("active")
//             }
//         })   
//     }
// }


for(let i=0; i < allFilters.length;i++){
    allFilters[i].addEventListener("click",filterHandler)
}

function filterHandler(e){
    TC.innerHTML = ""
    // let filterColor = e.currentTarget.children[0].classList[0].split("-")[0]; //html of cliked by currentTarget classlist= array of css of the child
    // let span =  e.currentTarget.children[0]
    // let style = getComputedStyle(span) //to fetch all css components
    // console.log(style.backgroundColor) // to get particular css component
    // TC.style.backgroundColor = style.backgroundColor
    if(e.currentTarget.classList.contains("active")){
        e.currentTarget.classList.remove("active")
        loadTickets();
    }
    else{
        let activeFilter = document.querySelector(".filter.active")
        if(activeFilter){
            activeFilter.classList.remove("active")
        }
        e.currentTarget.classList.add("active")
        let ticketPriority = e.currentTarget.children[0].classList[0].split("-")[0]
        loadTickets(ticketPriority)
    }
}

let addBtn = document.querySelector(".add");
let deletebtn = document.querySelector(".delete")

deletebtn.addEventListener("click", function(e){
    let selectedTickets = document.querySelectorAll(".tickets.active")
    let allTasks = JSON.parse(localStorage.getItem("allTasks"))
    for(let i =0; i < selectedTickets.length; i++){
        selectedTickets[i].remove()
        let ticketID = selectedTickets[i].querySelector(".tickets-id").innerText
        allTasks = allTasks.filter(function(data){
            return (("#" + data.ticketId) != ticketID)
        })
    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks))
})

addBtn.addEventListener("click", showModal)

let selectedPriority;

function showModal(e){
    if(!modalVisible){
        let modal = document.createElement("div")
        modal.classList.add("modal")
        modal.innerHTML = `<div class="task-to-be-added" data-typed="false" contenteditable="true">Enter your task here...</div>
        <div class="modal-priority-list">
            <div class="modal-black-filter modal-filters active"></div>
            <div class="modal-yellow-filter modal-filters"></div>
            <div class="modal-green-filter  modal-filters"></div>
            <div class="modal-orange-filter modal-filters"></div>
        </div>` //it is a string and not node
        // TC.innerHTML = TC.innerHTML + modal;
        TC.appendChild(modal)
        selectedPriority = "black" //by default
        let taskModal = document.querySelector(".task-to-be-added")
        taskModal.addEventListener("click", function(e){
            if(e.currentTarget.getAttribute("data-typed") ==  "false"){
                e.currentTarget.innerText = ""
                e.currentTarget.setAttribute("data-typed", "true")
            }
        })
        modalVisible = true;
        taskModal.addEventListener("keypress", addTickets.bind(this,taskModal)) //bind return a copy of a function with this value

        let modalFilters = document.querySelectorAll(".modal-filters")
        for(let i =0; i < modalFilters.length; i++){
            modalFilters[i].addEventListener("click", selectPriority.bind(this,taskModal));
        }

        // let modal = document.createElement("div")
        // modal.classList.add("modal")
        // modal.innerHTML = `<div class="task-to-be-added" contenteditable="true"></div>
        //     <div class="modal-priority-list">
        //         <div class="modal-black-filter modal-filters"></div>
        //         <div class="modal-yellow-filter modal-filters"></div>
        //         <div class="modal-green-filter  modal-filters"></div>
        //         <div class="modal-orange-filter modal-filters"></div>
        //     </div>
        // ` //this is node
        // TC.appendChild(modal)
        // // TC.innerHTML = TC.innerHTML + modal
        // let fetcModal = document.querySelector(".modal")
        // modalVisible = true
    }
    
}



function selectPriority(taskModal,e){
    let activeFilter = document.querySelector(".modal-filters.active")
    activeFilter.classList.remove("active")
    selectedPriority = e.currentTarget.classList[0].split("-")[1];
    e.currentTarget.classList.add("active")
    taskModal.click();
    taskModal.focus()
}

function addTickets(taskModal,e){
    if(e.key == "Enter" && e.shiftKey == false && taskModal.innerText.trim() != ""){ //trim will identify that atleat a character has enteredand remove spaces from left and right side
        let task = taskModal.innerText
        let id = uid();
        // let ticket = document.createElement("div")
        // ticket.classList.add("tickets")
        // ticket.innerHTML = `<div class="tickets-color tickets-color-${selectedPriority}"></div>
        //                 <div class="tickets-id">#${id}</div>
        //                 <div class="task">${task} </div>
        //             </div>`
        document.querySelector(".modal").remove();
        modalVisible = false
        // TC.innerHTML = TC.innerHTML + ticket
        // TC.appendChild(ticket)
        // ticket.addEventListener("click", function(e){
        //     if(e.currentTarget.classList.contains("active")){
        //         e.currentTarget.classList.remove("active")
        //     }else{
        //         e.currentTarget.classList.add("active")
        //     }
        // })

        let allTasks = localStorage.getItem("allTasks")
        if(allTasks == null){
            let data = [{"ticketId": id, "task": task, "priority": selectedPriority}]
            localStorage.setItem("allTasks", JSON.stringify(data))
        }else{
            let data = JSON.parse(allTasks)
            data.push({"ticketId": id, "task": task, "priority": selectedPriority})
            localStorage.setItem("allTasks", JSON.stringify(data))
        }
        let activeFilter = document.querySelector(".filter.active")
        TC.innerHTML = "" //for particular color filter adding
        if(activeFilter){
            let priority = activeFilter.children[0].classList[0].split("-")[0]
            loadTickets(priority)
        }
        else{
            loadTickets()
        }
    }
    else if(e.key == "Enter" && e.shiftKey == false){
        e.preventDefault();
        alert("Error! you've not types anything")
    }
}