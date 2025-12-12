import { test } from "@playwright/test";
import { RegisterLoginUser } from "../pageObject/RegisterLogIn";
import { CartPage } from "../pageObject/Cart";

test.beforeEach(async ({ page }) => {
  const registerLogin = new RegisterLoginUser(page);
  await registerLogin.goto();
});

test("Añadir productos al carrito", async ({ page }) => {
  const carrito = new CartPage(page);
  await carrito.botonProductos();
  await carrito.añadirAlCarrito("Blue Top", "1");
  await carrito.botonContinuar();
  await carrito.añadirAlCarrito("Men Tshirt", "2");
  await carrito.verCarrito();
  await carrito.carritoURL(page);
  await carrito.validarFilasCarrito(2);
  await carrito.validarColumnas("product-1", "Rs. 500", "1", "Rs. 500");
  await carrito.validarColumnas("product-2", "Rs. 400", "1", "Rs. 400");
});
