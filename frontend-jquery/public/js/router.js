const router = new Navigo("/");

const render = (page) => {
  fetch(page)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      // document.querySelector("#content").innerHTML = html;
      document.body.innerHTML = html;
    });
};

router
  .on("/register", (match) => {
    render("register.html");
  })
  .on("/login", (match) => {
    render("login.html");
  })
  .on("/", (match) => {
    render("unauth-home.html");
  })
  .resolve();
