document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const codeInput = document.querySelector("#code");

  const respons = document.querySelector(".outputRes");
  const errors = document.querySelector(".errorRes");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const code = codeInput.value;
    fetch("/submit-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }).then((res) => {
      res.json().then((data) => {
        respons.textContent = data.respons;
        errors.textContent = data.error;
      });
    });
  });
});

// codeForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // resultOne.textContent = "Please wait ...🛰️";
//   // resultTwo.textContent = " ";
//   // line.style.display = "none";
//   // greeting.textContent = " ";

//   const address = input.value;
//   fetch(`/weather?address=${address}`).then((res) => {
//     res.json().then((data) => {
//       respons.textContent = data.respons;
//       errors.textContent = data.error;
//     });
//   });
// });
