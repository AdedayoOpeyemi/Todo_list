static createTask(task) {
  const taskList = document.querySelector('.active-project-tasks');
  taskList.innerHTML += `
  <div class='d-flex flex-column task-body' >
    <div class='d-flex align-items-center'>
      
      <button class="d-flex justify-content-between w-100" type="button" data-bs-toggle="collapse" data-bs-parent=".task-body" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" > 
      
        <div>
        <input class="me-3" type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
          <i class="fas fa-landmark me-3"></i><span>${task.name}</span>
          <span>${task.dueDate}</span>
        </div>
        <div>
          <i class="far fa-trash-alt "></i>
        </div>
    
      </button>
    </div>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        ${task.description}
      </div>
    </div>
  </div>
`
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}