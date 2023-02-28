import axios from "axios";

Promise.all([
  axios.get("https://restcountries.com/v2/name/singapore"),
  axios.get("https://restcountries.com/v2/name/hong kong"),
  // results is an array of results whose elements correspond
  // to the elements in the Promise.all parameter array
])
  .then((res) => {
    console.log(res[0].data);
    console.log(res[1].data);

    const country1pop = res[0].data[0].population;
    const country2pop = res[1].data[0].population;
    if (country1pop > country2pop) {
      console.log("Sinapore has a larger pop");
    } else {
      console.log("Hong Kong has a larger pop");
    }
  })
  .catch((err) => {
    console.log(err);
  });

// // Axios promise the right way
// axios
//   .get("https://restcountries.com/v2/name/singapore")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// not the right way. dont wrap axios in a JS promise
// let data = new Promise((res, rej) => {
//   axios.get("https://restcountries.com/v2/name/singaore").then((response) => {
//     res(response);
//   });
//   // .catch((err)=>{
//   //   rej(err)
//   // })
// });

// data
//   .then((response) => {
//     console.log("actually always running with axios");
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// example promise
// let error = true;

// const myPromise = new Promise((happypromise, sadpromise) => {
//   if (error) {
//     sadpromise("You failed");
//   }
//   setTimeout(() => {
//     happypromise("You succeeded");
//   }, 3000);
// });

// myPromise
//   .then((resolvedData) => {
//     console.log(resolvedData);
//   })
//   .catch((failureMessage) => {
//     console.log(failureMessage);
//   });
