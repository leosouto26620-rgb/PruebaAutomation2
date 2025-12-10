import { test, expect } from "@playwright/test";
import { RegisterLoginUser } from "../pageObject/RegisterLogIn";

test.describe("Test de registro y Login", () => {
  test("Registro y eliminacion exitosa", async ({ page }) => {
    const registerLogin = new RegisterLoginUser(page);
    await registerLogin.goto();
    await registerLogin.firstRegister("hola", "colman@gmail.com");
    await registerLogin.accountInformation(
      "Mr.",
      "hola1",
      "12",
      "June",
      "2001"
    );
    await registerLogin.addressInformation(
      "hola",
      "jojo",
      "jiji",
      "fofo",
      "fofo1",
      "fofo2",
      "Canada",
      "ggff",
      "dfdf",
      "dfdf",
      "1255"
    );
    await registerLogin.deleteAccount();
  });
  test("Registrar, Logear y Eliminar", async ({ page }) => {
    const registerLogin = new RegisterLoginUser(page);
    await registerLogin.goto();
    await registerLogin.firstRegister("hola", "xdfgd@gmail.com");
    await registerLogin.accountInformation(
      "Mr.",
      "hola1",
      "12",
      "June",
      "2001"
    );
    await registerLogin.addressInformation(
      "hola",
      "jojo",
      "jiji",
      "fofo",
      "fofo1",
      "fofo2",
      "Canada",
      "ggff",
      "dfdf",
      "dfdf",
      "1255"
    );
    await registerLogin.logout();
    await registerLogin.loginForm("xdfgd@gmail.com", "hola1");
    await registerLogin.loginMsgSuccess("hola");
    await registerLogin.deleteAccount();
  });
  test("Logear con credenciales incorrectas", async ({ page }) => {
    const registerLogin = new RegisterLoginUser(page);
    await registerLogin.goto();
    await registerLogin.loginForm("qu@ds.co", "dd");
    await registerLogin.loginErrorMsg();
  });
});
