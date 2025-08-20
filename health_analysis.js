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

    const conditionsCount = {
        Diabetes:0,
        Thyroid:0,
        "High Blood Pressure": 0,
    };

    const conditionsGenderCount = {
        Male: {
            Diabetes:0,
            Thyroid:0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes:0,
            Thyroid:0,
            "High Blood Pressure": 0,
        }
    };

    for(const patient of patients){
        conditionsCount[patient.condition]++;
        conditionsGenderCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${patientNumber}<br><br>
                        Conditions Breakdown: <br>
                        Diabetes: ${conditionsCount["Diabetes"]}<br>
                        Thyroid: ${conditionsCount["Thyroid"]}<br>
                        High Blood Pressure: ${conditionsCount["High Blood Pressure"]}<br><br>
                        Gender-Based Conditions: <br>
                        Male:<br>
                        Diabetes:${conditionsGenderCount["Male"]["Diabetes"]}<br>
                        Thyroid:${conditionsGenderCount["Male"]["Thyroid"]}<br>
                        High Blood Pressure:${conditionsGenderCount["Male"]["High Blood Pressure"]}<br>
                        Female:<br>
                        Diabetes:${conditionsGenderCount["Female"]["Diabetes"]}<br>
                        Thyroid:${conditionsGenderCount["Female"]["Thyroid"]}<br>
                        High Blood Pressure:${conditionsGenderCount["Female"]["High Blood Pressure"]}<br>`

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