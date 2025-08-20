const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");
const patients = [];

function addPatient(){
    const name = document.getElementById("name").value;
    const gender = document.querySelector("input[name='gender']:checked").value;
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if(name && gender && age && condition){
        patients.push({name:name , gender:gender , age:age , condition:condition});
    }

    resetForm();
    generateReport();
}

function resetForm(){
    document.getElementById("name").value = "";
    document.querySelector("input[name='gender']:checked").checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}

function generateReport(){
    const patientNumber = patients.length;
    const diabetes = patients.filter(function(patient , ind){
        return patient.condition === "Diabetes";
    })

    const Thyroids = patients.filter(function(patient , ind){
        return patient.condition === "Thyroid";
    })

    const highBlood = patients.filter(function(patient , ind){
        return patient.condition === "High Blood Pressure";
    })

    const diabetesMale = patients.filter(function(patient , ind){
        return patient.gender === "Male" && patient.condition === "Diabetes";
    })

    const ThyroidsMale = patients.filter(function(patient , ind){
        return patient.gender === "Male" && patient.condition === "Thyroid";
    })

    const highBloodMale = patients.filter(function(patient , ind){
        return patient.gender === "Male" && patient.condition === "High Blood Pressure";
    })

    report.innerHTML = `Number of patients: ${patientNumber}<br><br>
                        Conditions Breakdown: <br>
                        Diabetes: ${diabetes.length}<br>
                        Thyroid: ${Thyroids.length}<br>
                        High Blood Pressure: ${highBlood.length}<br><br>
                        Gender-Based Conditions: <br>
                        Male:<br>
                        Diabetes:${diabetesMale.length}<br>
                        Thyrois:${ThyroidsMale.length}<br>
                        High Blood Pressure:${highBloodMale.length}<br>
                        Female:<br>
                        Diabetes:${diabetes.length - diabetesMale.length}<br>
                        Thyrois:${Thyroids.length - ThyroidsMale.length}<br>
                        High Blood Pressure:${highBlood.length - highBloodMale.length}<br>`

}


function searchCondition(){
    const conditionInput = document.getElementById("conditionInput").value;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    fetch("health_analysis.json").then
    ((respose) => respose.json()).then((data) => {
        const condition = data.conditions.find(function(item){
            return item.name === conditionInput;
        })
        if(condition){
            const symptoms = condition.symptoms.join(", ");
            const preventions = condition.prevention.join(", ");
            const treatment = condition.treatment;
            resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
            resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;
            resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
            resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${preventions}</p>`;
            resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        }
        else{
            resultDiv.innerHTML = 'Condition not found.';
        }
    }).catch(error => {
        console.error("Error: " + error)
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    })

}

btnSearch.addEventListener("click" , searchCondition);
addPatientButton.addEventListener("click" , addPatient);