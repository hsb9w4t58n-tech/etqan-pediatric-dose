let drugs = [];

fetch("drugs.json")
.then(response => response.json())
.then(data => {

    drugs = data;

    loadDrugsByType();

    document
    .getElementById("drugType")
    .addEventListener(
        "change",
        loadDrugsByType
    );

    document
    .getElementById("drugSelect")
    .addEventListener(
        "change",
        updateConcentrations
    );

});

function loadDrugsByType(){

    const type =
        document.getElementById(
            "drugType"
        ).value;

    const select =
        document.getElementById(
            "drugSelect"
        );

    select.innerHTML =
        '<option value="">اختر الدواء</option>';

    drugs
    .filter(
        drug => drug.type === type
    )
    .forEach(drug => {

        const option =
            document.createElement("option");

        option.value =
            drug.id;

        option.textContent =
            drug.generic_name;

        select.appendChild(option);

    });

    document.getElementById(
        "concentrationSelect"
    ).innerHTML =
    '<option>اختر التركيز</option>';

}

function updateConcentrations(){

    const drugId =
        parseInt(
            document.getElementById(
                "drugSelect"
            ).value
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
            document.getElementById(
                "weight"
            ).value
        );

    const age =
        parseFloat(
            document.getElementById(
                "age"
            ).value
        );

    const ageUnit =
        document.getElementById(
            "ageUnit"
        ).value;

    if(!weight){

        document.getElementById(
            "result"
        ).innerHTML =
        "الرجاء إدخال الوزن";

        return;
    }

    if(!age){

        document.getElementById(
            "result"
        ).innerHTML =
        "الرجاء إدخال العمر";

        return;
    }

    const drugId =
        parseInt(
            document.getElementById(
                "drugSelect"
            ).value
        );

    const drug =
        drugs.find(
            d => d.id === drugId
        );

    if(!drug){

        document.getElementById(
            "result"
        ).innerHTML =
        "اختر دواء";

        return;
    }

    let doseMg =
        weight *
        drug.dose_mg_kg;

    if(
        doseMg >
        drug.max_dose_mg
    ){

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

    document.getElementById(
        "result"
    ).innerHTML =
`
<div class="result-title">
💊 ${drug.generic_name}
<br>
<small>${drug.arabic_name || ""}</small>
</div>

<div class="result-item">
    <span class="result-label">👶 العمر</span>
    <span class="result-value">
        ${age}
        ${ageUnit === "months" ? "شهر" : "سنة"}
    </span>
</div>

<div class="result-item">
    <span class="result-label">⚖️ الوزن</span>
    <span class="result-value">
        ${weight} كغم
    </span>
</div>

<div class="result-item">
    <span class="result-label">💉 الجرعة</span>
    <span class="result-value">
        ${doseMg.toFixed(1)} mg
    </span>
</div>

<div class="result-item">
    <span class="result-label">🥄 الحجم</span>
    <span class="result-value">
        ${doseMl.toFixed(2)}
        mL
    </span>
</div>

<div class="result-item">
    <span class="result-label">📋 الحساب</span>
    <span class="result-value">
        ${drug.dose_mg_kg}
        mg/kg
    </span>
</div>

<div class="result-item">
    <span class="result-label">🚫 الحد الأعلى</span>
    <span class="result-value">
        ${drug.max_dose_mg}
        mg
    </span>
</div>

<div class="result-frequency">
⏰ ${drug.frequency || "حسب وصف الطبيب"}
</div>
`;

}