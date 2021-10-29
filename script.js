var selectedRow = null

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["stdId"] = document.getElementById("stdId").value;
    formData["stream"] = document.getElementById("stream").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.stdId;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.stream;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)" class="btn btn-primary">Edit</button>
                       <button onClick="onDelete(this)" class="btn btn-danger">Delete</button>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("stdId").value = "";
    document.getElementById("stream").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    document.getElementById("addData").textContent="Update Data"
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("stdId").value = selectedRow.cells[1].innerHTML;
    document.getElementById("stream").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    document.getElementById("addData").textContent="Add Data"
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.stdId;
    selectedRow.cells[2].innerHTML = formData.stream;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function searchName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myName");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
function searchID() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myID");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
function searchStream() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myStream");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
function searchCity() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myCity");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
    
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {

    //alert(headerCell);
    /*if(headerCell.id=="nameHeader"){
        headerCell.innerText=headerCell.innerText+" \u25B2"+"\u25BC";
    }*/
    if(headerCell.id!="crudHeader")
        headerCell.innerText=headerCell.innerText+"\u25B2"+"\u25BC";
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        if(headerIndex==0){
            document.getElementById("nameHeader").innerText="Full Name"+"\u25B2"+"\u25BC"
            document.getElementById("idHeader").innerText="ID"
            document.getElementById("streamHeader").innerText="Stream"+"\u25B2"+"\u25BC"
            document.getElementById("cityHeader").innerText="City"+"\u25B2"+"\u25BC"
        }
        if(headerIndex==1){
            document.getElementById("nameHeader").innerText="Full Name"
            document.getElementById("idHeader").innerText="ID"+"\u25B2"+"\u25BC"
            document.getElementById("streamHeader").innerText="Stream"+"\u25B2"+"\u25BC"
            document.getElementById("cityHeader").innerText="City"+"\u25B2"+"\u25BC"
        }
        if(headerIndex==2){
            document.getElementById("nameHeader").innerText="Full Name"+"\u25B2"+"\u25BC"
            document.getElementById("idHeader").innerText="ID"+"\u25B2"+"\u25BC"
            document.getElementById("streamHeader").innerText="Stream"
            document.getElementById("cityHeader").innerText="City"+"\u25B2"+"\u25BC"
        }
        if(headerIndex==3){
            document.getElementById("nameHeader").innerText="Full Name"+"\u25B2"+"\u25BC"
            document.getElementById("idHeader").innerText="ID"+"\u25B2"+"\u25BC"
            document.getElementById("streamHeader").innerText="Stream"+"\u25B2"+"\u25BC"
            document.getElementById("cityHeader").innerText="City"
        }
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});




function clearFields() {
    document.getElementById("myName").value="";
    document.getElementById("myID").value="";
    document.getElementById("myStream").value="";
    document.getElementById("myCity").value="";
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myName");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

