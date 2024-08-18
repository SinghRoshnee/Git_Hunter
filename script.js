// window.onload = function () {
//   document.getElementById("icon").classList.add("ri-github-fill");
// };

// const Apiurl = "https://api.github.com/users/";
// const Inputtext = document.querySelector("#username");
// const Submitbtn = document.querySelector("#sub");
// const result = document.querySelector("#res");
// const errorMsg = document.querySelector("#err");

// const data_container = document.querySelector(".data-container");
// const Error_msg = document.querySelector(".error-msg");

// Submitbtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   let inputval = Inputtext.value;
//   let orignal_name = inputval.split(" ").join("").toLowerCase();

//   if (orignal_name === "") {
//     alert("Enter username");
//   } else {
//     fetch("https://api.github.com/users/" + orignal_name)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`User not found: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         data_container.style.display = "block";
//         document.querySelector("#avatar").src = `${data.avatar_url}`;
//         document.querySelector("#login-name").innerHTML = data.login;
//         document.querySelector("#bio").innerHTML = data.bio;
//         document.querySelector(
//           "#followers"
//         ).innerHTML = `Followers ${data.followers}`;
//         document.querySelector(
//           "#following"
//         ).innerHTML = `Following ${data.following}`;
//         document.querySelector(
//           "#repo"
//         ).innerHTML = `Repositories ${data.public_repos}`;
//         // document.querySelector("#mulrepo").innerHTML = `${data.repos_url}`

//         Error_msg.innerHTML = ""; // Clear any previous error messages
//       })
//       .catch((error) => {
//         console.log(error);
//         data_container.style.display = "none";
//         Error_msg.innerHTML = `Error: ${error.message}`;
//       });
//   }

//   Inputtext.value = "";
// });


window.onload = function () {
  document.getElementById("icon").classList.add("ri-github-fill");
};

const Apiurl = "https://api.github.com/users/";
const Inputtext = document.querySelector("#username");
const Submitbtn = document.querySelector("#sub");
const errorMsg = document.querySelector("#err");

const data_container = document.querySelector(".data-container");
const Error_msg = document.querySelector(".error-msg");

Submitbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let inputval = Inputtext.value;
  let orignal_name = inputval.split(" ").join("").toLowerCase();

  if (orignal_name === "") {
      alert("Enter username");
  } else {
      fetch(Apiurl + orignal_name)
          .then((response) => {
              if (!response.ok) {
                  throw new Error(`User not found: ${response.status}`);
              }
              return response.json();
          })
          .then((data) => {
              console.log(data);
              data_container.style.display = "block";
              // document.querySelector("#arrow").innerHTML = `<a href="${}" target="_blank">${repo.name}</a>`
              document.querySelector("#avatar").src = `${data.avatar_url}`;
              document.querySelector("#login-name").innerHTML = data.login;
              document.querySelector("#bio").innerHTML = data.bio || "No bio available";
              document.querySelector("#followers").innerHTML = `Followers: ${data.followers}`;
              document.querySelector("#following").innerHTML = `Following: ${data.following}`;
              document.querySelector("#repo").innerHTML = `Repositories: ${data.public_repos}`;

              // Fetch and display repositories
              fetch(data.repos_url)
                  .then((response) => response.json())
                  .then((repos) => {
                      const reposList = document.querySelector("#repo-list");
                      reposList.innerHTML = ""; // Clear previous list

                      repos.forEach((repo) => {
                          const listItem = document.createElement("li");
                          listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                          reposList.appendChild(listItem);
                      });
                  })
                  .catch((error) => {
                      console.log("Error fetching repositories:", error);
                      Error_msg.innerHTML = `Error fetching repositories: ${error.message}`;
                  });

              Error_msg.innerHTML = ""; // Clear any previous error messages
          })
          .catch((error) => {
              console.log(error);
              data_container.style.display = "none";
              Error_msg.innerHTML = `Error: ${error.message}`;
          });
  }

  Inputtext.value = "";
});
