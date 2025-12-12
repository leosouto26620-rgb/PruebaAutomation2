import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly productBtn: Locator;
  readonly firstProduct: Locator;
  readonly addToCartBtn: Locator;
  readonly continueShopp: Locator;
  readonly secondProduct: Locator;
  readonly addToCartBtn2: Locator;
  readonly viewCartBtn: Locator;

  constructor(private page: Page) {
    this.productBtn = page.getByRole("link", { name: " Products" });
    this.firstProduct = page.getByText("Rs. 500 Blue Top Add to cart").first();
    this.addToCartBtn = page.getByText("Add to cart").nth(1);
    this.continueShopp = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.secondProduct = page
      .getByText("Rs. 400 Men Tshirt Add to cart")
      .first();
    this.addToCartBtn2 = page.getByText("Add to cart").nth(3);
    this.viewCartBtn = page.getByRole("link", { name: "View Cart" });
  }

  getProduct(name: string) {
    return this.page.getByText(name).first();
  }

  getAddToCartButton(productId: string) {
    return this.page.locator(`[data-product-id="${productId}"]`).first();
  }

  async botonProductos() {
    await this.productBtn.click();
  }

  async añadirAlCarrito(name: string, productId: string) {
    await this.getProduct(name).hover();
    await this.getAddToCartButton(productId).click();
  }

  async botonContinuar() {
    await this.continueShopp.click();
  }

  async verCarrito() {
    await this.viewCartBtn.click();
  }

  async carritoURL(page: Page) {
    await expect(page).toHaveURL("/view_cart");
  }

  getCartTotalRows() {
    return this.page.locator("table tbody tr");
  }

  async validarFilasCarrito(num: number) {
    await expect(this.getCartTotalRows()).toHaveCount(num);
  }

  getRow(id: string) {
    return this.page.locator(`tr[id="${id}"]`);
  }

  getPrice(id: string) {
    return this.getRow(id).locator(".cart_price p");
  }

  getQuantity(id: string) {
    return this.getRow(id).locator(".cart_quantity button");
  }

  getTotal(id: string) {
    return this.getRow(id).locator(".cart_total p");
  }

  getDeleteBtn(id: string) {
    return this.getRow(id).locator(".cart_delete");
  }

  async deleteRow(id: string) {
    await this.getDeleteBtn(id).click();
  }

  async validarColumnas(
    id: string,
    price: string,
    quantity: string,
    total: string
  ) {
    await expect(this.getPrice(id)).toHaveText(price);
    await expect(this.getQuantity(id)).toHaveText(quantity);
    await expect(this.getTotal(id)).toHaveText(total);
  }
}
