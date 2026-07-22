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

});

function calculateDose(){

    const weight =
        parseFloat(
            document.getElementById("weight").value
        );

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
        drug.concentrations[0].mg_per_ml;

    const doseMl =
        doseMg / mgPerMl;

    document.getElementById("result").innerHTML =
    `
    <b>${drug.generic_name}</b>
    <br><br>

    الجرعة:
    ${doseMg.toFixed(1)} mg

    <br><br>

    الحجم:
    ${doseMl.toFixed(2)} mL
    `;
}