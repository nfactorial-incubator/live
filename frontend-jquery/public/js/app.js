// Login

$("#login-form").submit((event) => {
  event.preventDefault();
  const nickname = $("#nickname").val();
  const password = $("#password").val();
  login({ nickname, password });
});

const login = async (body) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.message}`);
    }
    localStorage.setItem("user", JSON.stringify(json));
    window.location = "home.html";
  } catch (e) {
    alert(e.message);
  }
};

// Register

const forms = document.querySelectorAll(".needs-validation");

Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        event.preventDefault();
        onFormSubmitted();
      }
    },
    false
  );
});

const onFormSubmitted = () => {
  const firstname = $("#firstname").val();
  const lastname = $("#lastname").val();
  const nickname = $("#nickname").val();
  const password = $("#password").val();
  register({
    firstname,
    lastname,
    nickname,
    password,
    role: "student",
    // ...(reader.result && { avatar: reader.result }),
  });
};

const register = async (body) => {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.message}`);
    }

    localStorage.setItem("user", JSON.stringify(json));
    $("#register-form").removeClass("was-validated");
    $("#register-form")[0].reset();
    window.location = "home.html";
  } catch (e) {
    alert(e.message);
  }
};
