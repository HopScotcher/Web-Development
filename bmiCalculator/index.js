let height = document.querySelector("#height");
let weight = document.querySelector("#weight");
let bmiBtn = document.querySelector("#getBmi");
let globalBmi;

const validateInput = () => {};

bmiBtn.addEventListener("click", (e) => {
  let heightBox = document.forms["form"]["height"].value;
  let weightBox = document.forms["form"]["weight"].value;

  e.preventDefault();

  if (heightBox == "" || weightBox == "") {
    alert("Please enter a value");
    return false;
  } else {
    calculateBmi();
    return true;
  }
});

const calculateBmi = () => {
  let heightValue = height.value;
  let weightValue = weight.value;

  let bmi = weightValue / heightValue ** 2;
  let bmiOutput = document.querySelector("#bmi");

  console.log(`Your bmi is ${bmi}`);
  let fixedBmi = parseFloat(bmi.toFixed(2));
  bmiOutput.textContent = `Your BMI is ${fixedBmi}`;

  console.log(`inputed height: ${heightValue}`);
  console.log(`inputed weight: ${weightValue}`);

  globalBmi = fixedBmi;
  console.log(globalBmi);
  adjustRange();
};

function adjustRange() {
  //access the pointer element
  // once the getbmi btn is clicked, check if the value is valid
  // if valid calaculate the percentage and set the 'left' property to the value
  // if not valid, do nothing
  let pointer = document.querySelector(".pointer");
  let classification = document.querySelector(".classification");
  let judgement;

  if (globalBmi != null || globalBmi != 0) {
    percentBmi = (globalBmi * 100) / 43.5;

    // pointer.style.left = `${percentBmi}%`;
    pointer.style.transformX = `${percentBmi}%`;
    console.log(percentBmi);
  }

  if (globalBmi < 16) {
    judgement = "Severe Thinness";
  } else if (globalBmi >= 16 && globalBmi <= 17) {
    judgement = "Moderate Thinness";
  } else if (globalBmi > 17 && globalBmi <= 18.5) {
    judgement = "Mild Thinness";
  } else if (globalBmi > 18.5 && globalBmi <= 25) {
    judgement = "Normal";
  } else if (globalBmi > 25 && globalBmi <= 30) {
    judgement = "Overweight";
  } else if (globalBmi > 30 && globalBmi <= 35) {
    judgement = "Obese Class I";
  } else if (globalBmi > 35 && globalBmi <= 40) {
    judgement = "Obese Class II";
  } else if (globalBmi > 40) {
    judgement = "Obese Class III";
  }

  classification.textContent = judgement;
}
