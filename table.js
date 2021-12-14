const form = document.getElementById('form');
const titlet = document.getElementById('titlet');
const author = document.getElementById('author');
const date = document.getElementById('date');
const lang = document.getElementById('lang');
var table = document.getElementById("table");
var type=document.getElementsByClassName("type");
var max_length = 30;


form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});




//Retrieve the data
function readFormData(){
    var formData = {};
    formData["titlet"] = document.getElementById("titlet").value;

    return formData;
}



function checkInputs() {
	// trim to remove the whitespaces
	const titletValue = titlet.value.trim();
	const authorValue = author.value.trim();
	const priceValue = price.value.trim();
	const dateValue = date.value.trim();
    

    var letters = /^[a-z\s]*$/i;
    var error_situation = false;

	if(titletValue === '') {
		setErrorFor(titlet, '*title cannot be blank');
        error_situation++

    }
     else {
		setSuccessFor(titlet);
	}
    if (titlet.value.length>max_length) {
        setErrorFor(titlet, '*title must be lest 30');
        error_situation++
    }
    if (!titletValue.match(letters)) {
        setErrorFor(titlet, '*letters only');
        error_situation++
	}
    if(priceValue === '') {
		setErrorFor(price, '*author cannot be blank');
        error_situation++
      
	} else {
		setSuccessFor(price);
	}
    
	
	if(authorValue === '') {
		setErrorFor(author, '*author cannot be blank');
        error_situation++
        
	} else {
		setSuccessFor(author);
	}

    if (author.value.length>max_length) {
        setErrorFor(author, '*title must be lest 30');
    }
	
	if(priceValue === '') {
		setErrorFor(price, '*price cannot be blank');
        error_situation++
	} else {
		setSuccessFor(price);
       
	}
	
    if(dateValue === '') {
        setErrorFor(date, '*date cannot be blank');
        error_situation++
	} else {
        setSuccessFor(date);
	}
    
    if(lang.value == ""){
        error_situation++
        lang.parentElement.className = 'form-control error'
        setErrorFor(lang, '*Language cannot be blank');
    } else {
        setSuccessFor(lang);
	}
   

    
    var getSelectedValue = document.querySelector('input[name="season"]:checked');

            if(getSelectedValue != null) {
               
                document.getElementById("radiobtn").innerHTML =  " season is selected";
                radiobtn.style.color = '#2ecc71'
            }
            else {
          document.getElementById("radiobtn").innerHTML = "*You have not selected any season";
          radiobtn.style.color = '#e74c3c'
          error_situation++
            }
//////////////////////////////////////////////////////////////////////////////

        if(!error_situation){
            var row = table.insertRow(-1);
            row.insertCell(0).innerHTML = titletValue;
            row.insertCell(1).innerHTML = authorValue;
            row.insertCell(2).innerHTML = dateValue;
            row.insertCell(3).innerHTML = priceValue;
            row.insertCell(4).innerHTML = lang.options[lang.selectedIndex].value;
            row.insertCell(5).innerHTML = '<input type="submit" value="Edit" class="edit" onClick="onEdit(this)">'+ '<button class="delete"  onClick="onDelete(this)">Delete</button>'
            row.insertCell(5).innerHTML = getSelectedValue;

            
        }
        // if (error_situation = true){
        //     resetForm()
        // }
    }

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
    error_situation = false;
    
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
    error_situation = true;
    
}


//Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('titlet').value = selectedRow.cells[0].innerHTML;
    document.getElementById('author').value = selectedRow.cells[1].innerHTML;
    document.getElementById('date').value = selectedRow.cells[2].innerHTML;
    document.getElementById('price').value = selectedRow.cells[3].innerHTML;
    document.getElementById('lang').value = selectedRow.cells[4].innerHTML;
    typecheck = selectedRow.cells[4].innerHTML;


    for(j=0;j<type.length;j++){
        if(selectedRow.cells[5].innerHTML==type[j].value)
        {
            type[j].checked=true;
        }
    }
    document.getElementById('Submit').style.display = "none";
    document.getElementById('Update').style.display = "block";

}

function onUpdate(formData){
    selectedRow.cells[0].innerHTML = document.getElementById('titlet').value;
    selectedRow.cells[1].innerHTML = document.getElementById('author').value;
    selectedRow.cells[2].innerHTML = document.getElementById('date').value;
    selectedRow.cells[3].innerHTML = document.getElementById('price').value;
    selectedRow.cells[4].innerHTML = document.getElementById('lang').options[lang.selectedIndex].value;
    for(j=0;j<type.length;j++){
        if( type[j].checked=true)
        {
            selectedRow.cells[5].innerHTML=type[j].value
           
        }
    }
    document.getElementById('Update').style.display = "none";
    document.getElementById('Submit').style.display = "block";

}


//Delete the data
function onDelete(B){
    if(confirm('Do you want to delete this row?')){
        row = B.parentElement.parentElement;
        document.getElementById('table').deleteRow(row.rowIndex);
    }
  
}


