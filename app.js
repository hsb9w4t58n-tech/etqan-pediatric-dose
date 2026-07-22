let drugs = [];

fetch("drugs.json")
.then(response => response.json())
.then(data => {

    drugs = data;

    const select =
        document.getElementById("drugSelect");

    drugs.forEach(drug => {

        const option =
            document.createElement("option");

        option.value = drug.id;

        option.textContent =
            drug.generic_name;

        select.appendChild(option);

    });
document
.getElementById("drugSelect")
.addEventListener("change", updateConcentrations);
});
function updateConcentrations(){

    const drugId =
        parseInt(
            document.getElementById("drugSelect").value
        );

    const drug =
        drugs.find(
            d => d.id === drugId
        );

    const concSelect =
        document.getElementById(
            "concentrationSelect"
        );

    concSelect.innerHTML = "";

    if(!drug) return;

    drug.concentrations.forEach(conc => {

        const option =
            document.createElement("option");

        option.value =
            conc.mg_per_ml;

        option.textContent =
            conc.name;

        concSelect.appendChild(option);

    });

}
function calculateDose(){

    const weight =
        parseFloat(
            document.getElementById("weight").value
        );

    const age =
        parseFloat(
            document.getElementById("age").value
        );

    const ageUnit =
        document.getElementById("ageUnit").value;

    let ageYears = age;

    if(ageUnit === "months"){
        ageYears = age / 12;
    }

    if(!weight){

        document.getElementById("result").innerHTML =
            "الرجاء إدخال الوزن";

        return;
    }

    const drugId =
        parseInt(
            document.getElementById("drugSelect").value
        );

    const drug =
        drugs.find(
            d => d.id === drugId
        );

    if(!drug){

        document.getElementById("result").innerHTML =
            "اختر دواء";

        return;
    }

    let doseMg =
        weight * drug.dose_mg_kg;

    if(doseMg > drug.max_dose_mg){

        doseMg =
            drug.max_dose_mg;
    }

    const mgPerMl =
parseFloat(
document.getElementById(
"concentrationSelect"
).value
);

    const doseMl =
        doseMg / mgPerMl;

    document.getElementById("result").innerHTML =
`
<h3>${drug.generic_name}</h3>

<div class="result-item">
  <span class="result-label">👶 العمر</span>
  <span class="result-value">${age} ${ageUnit === "months" ? "شهر" : "سنة"}</span>
</div>

<div class="result-item">
  <span class="result-label">⚖️ الوزن</span>
  <span class="result-value">${weight} كغم</span>
</div>

<div class="result-item">
  <span class="result-label">💉 الجرعة</span>
  <span class="result-value">${doseMg.toFixed(1)} mg</span>
</div>

<div class="result-item">
  <span class="result-label">🥄 الحجم</span>
  <span class="result-value">${doseMl.toFixed(2)} mL</span>
</div>
}