import { Page, Locator, expect } from "@playwright/test";

export class RegisterLoginUser {
  readonly homeHeader: Locator;
  readonly signUpLoginBtn: Locator;
  readonly signUpHeader: Locator;
  readonly nameInput: Locator;
  readonly signUpEmail: Locator;
  readonly signUpBtn: Locator;
  readonly accountInfo: Locator;
  //readonly title: Locator;
  readonly passwordInput: Locator;
  readonly dayPicker: Locator;
  readonly monthPicker: Locator;
  readonly yearPicker: Locator;
  readonly newsletter: Locator;
  readonly specialOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNum: Locator;
  readonly createAccountBtn: Locator;
  readonly accountCreatedMsg: Locator;
  readonly continueBtn: Locator;
  readonly deleteAccountBtn: Locator;
  readonly deleteMsg: Locator;
  readonly loginHeader: Locator;
  readonly loginEmail: Locator;
  readonly loginBtn: Locator;
  readonly logoutBtn: Locator;
  readonly passInputLogin: Locator;
  readonly loginError: Locator;

  constructor(private page: Page) {
    this.homeHeader = page.getByRole("heading", {
      name: "AutomationExercise",
    });
    this.signUpLoginBtn = page.getByRole("link", { name: " Signup / Login" });
    this.signUpHeader = page.getByRole("heading", {
      name: "New User Signup!",
    });
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.signUpEmail = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.signUpBtn = page.getByRole("button", { name: "Signup" });
    this.accountInfo = page.getByText("Enter Account Information");

    this.passwordInput = page.getByRole("textbox", { name: "Password *" });
    this.dayPicker = page.locator("#days");
    this.monthPicker = page.locator("#months");
    this.yearPicker = page.locator("#years");
    this.newsletter = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.specialOffers = page.getByRole("checkbox", {
      name: "Receive special offers from",
    });
    this.firstName = page.getByRole("textbox", { name: "First name *" });
    this.lastName = page.getByRole("textbox", { name: "Last name *" });
    this.company = page.getByRole("textbox", { name: "Company", exact: true });
    this.address = page.getByRole("textbox", {
      name: "Address * (Street address, P.",
    });
    this.address2 = page.getByRole("textbox", { name: "Address 2" });
    this.country = page.getByLabel("Country *");
    this.state = page.getByRole("textbox", { name: "State *" });
    this.city = page.getByRole("textbox", { name: "City * Zipcode *" });
    this.zipcode = page.locator("#zipcode");
    this.mobileNum = page.getByRole("textbox", { name: "Mobile Number *" });
    this.createAccountBtn = page.getByRole("button", {
      name: "Create Account",
    });
    this.accountCreatedMsg = page.getByText("Account Created!");
    this.continueBtn = page.getByRole("link", { name: "Continue" });

    this.deleteAccountBtn = page.getByRole("link", {
      name: " Delete Account",
    });
    this.deleteMsg = page.getByText("Account Deleted!");
    this.loginHeader = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmail = page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.logoutBtn = page.getByRole("link", { name: " Logout" });
    this.passInputLogin = page.getByRole("textbox", { name: "Password" });
    this.loginError = page.getByText("Your email or password is");
  }

  async goto() {
    await this.page.goto("/");
    await expect(this.homeHeader).toBeVisible();
  }

  async firstRegister(name: string, email: string) {
    await this.signUpLoginBtn.click();
    await expect(this.signUpHeader).toBeVisible();
    await this.nameInput.fill(name);
    await this.signUpEmail.fill(email);
    await this.signUpBtn.click();
    await expect(this.accountInfo).toBeVisible();
  }

  getTitleRadio(title: string) {
    return this.page.getByRole("radio", { name: title });
  }

  async accountInformation(
    title: string,
    pass: string,
    day: string,
    month: string,
    year: string
  ) {
    await this.getTitleRadio(title).check();
    await this.passwordInput.fill(pass);
    await this.dayPicker.selectOption(day);
    await this.monthPicker.selectOption(month);
    await this.yearPicker.selectOption(year);
    await this.newsletter.click();
    await this.specialOffers.click();
  }

  getUserName(username: string) {
    return this.page.getByText("Logged in as " + username);
  }

  async addressInformation(
    username: string,
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNum: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.company.fill(company);
    await this.address.fill(address);
    await this.address2.fill(address2);
    await this.country.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobileNum.fill(mobileNum);
    await this.createAccountBtn.click();
    await expect(this.accountCreatedMsg).toBeVisible();
    await this.continueBtn.click();
    await expect(this.getUserName(username)).toBeVisible();
  }

  async deleteAccount() {
    await this.deleteAccountBtn.click();
    await expect(this.deleteMsg).toBeVisible();
    await this.continueBtn.click();
  }

  async loginForm(email: string, pass: string) {
    await this.signUpLoginBtn.click();
    await expect(this.loginHeader).toBeVisible();
    await this.loginEmail.fill(email);
    await this.passInputLogin.fill(pass);
    await this.loginBtn.click();
  }

  async loginMsgSuccess(username: string) {
    await expect(this.getUserName(username)).toBeVisible();
  }

  async logout() {
    await this.logoutBtn.click();
  }

  async loginErrorMsg() {
    await expect(this.loginError).toBeVisible();
  }
}
