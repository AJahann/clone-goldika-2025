import FaContent from "../../src/content/fa.json";

before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

const sampleUser = {
  phone: "09010000101",
  password: "123456",
};

const sleep = (ms = 1000) => cy.wait(ms);

describe("Complete User Journey: Landing to Payment", () => {
  context("1. Landing Page & Navigation", () => {
    it("should load the home page successfully", () => {
      cy.visit("/");
      cy.get("body").should("be.visible");
      cy.get("header").should("be.visible");
      cy.get("footer").should("be.visible");

      cy.contains("h1", FaContent.home.brand_name).should("exist");
    });

    it("should navigate to about page", () => {
      cy.visit("/");
      cy.get('header a[href*="/about"]').first().click();
      cy.url().should("include", "/about");
    });

    it("should navigate to FAQ page", () => {
      cy.visit("/");
      cy.get('header a[href*="/faq"]').first().click();
      cy.url().should("include", "/faq");
    });

    it("should navigate to contact page", () => {
      cy.visit("/");
      cy.get('header a[href*="/contact"]').first().click();
      cy.url().should("include", "/contact");
    });
  });

  context("2. Authentication Flow", () => {
    it("should navigate to login page", () => {
      cy.visit("/");
      cy.get('a[href*="/login"]').first().click();
      cy.url().should("include", "/login");
      cy.contains("h1", FaContent.auth.login.login).should("exist");
    });

    it("should show error with invalid credentials", () => {
      cy.visit("/login");

      cy.get('input[id="number"]').type("09012345678");
      cy.get('input[id="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();

      cy.get("form > p").should(
        "have.text",
        "نام کاربری یا رمز عبور اشتباه است",
      );
      cy.url().should("include", "/login");
    });

    it("should navigate to sign-up page", () => {
      cy.visit("/login");
      cy.get('a[href*="/sign-up"]').first().click();
      cy.url().should("include", "/sign-up");
      cy.contains("h1", FaContent.auth.register.register).should("exist");
    });

    it("should successfully login with valid credentials", () => {
      cy.visit("/login");

      cy.get('input[id="number"]').type(sampleUser.phone);
      cy.get('input[id="password"]').type(sampleUser.password);
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
      cy.contains(FaContent.dashboard.dashboard.home).should("exist");
    });
  });

  context("3. Dashboard Navigation", () => {
    beforeEach(() => {
      cy.login({
        phone: sampleUser.phone,
        password: sampleUser.password,
      });
      cy.visit("/dashboard");
    });

    it("should load dashboard successfully", () => {
      cy.url().should("include", "/dashboard");
      cy.contains(FaContent.dashboard.dashboard.home).should("exist");
    });

    it("should navigate to wallet page", () => {
      cy.get('a[href*="/dashboard/wallet"]').first().click();
      cy.url().should("include", "/dashboard/wallet");
    });

    it("should navigate to trade page", () => {
      cy.get('a[href*="/dashboard/trade"]').first().click();
      cy.url().should("include", "/dashboard/trade");
    });

    it("should navigate to deposit page", () => {
      cy.get('a[href*="/dashboard/deposit"]').first().click();
      cy.url().should("include", "/dashboard/deposit");
    });

    it("should navigate to withdraw page", () => {
      cy.get('a[href*="/dashboard/withdraw"]').first().click();
      cy.url().should("include", "/dashboard/withdraw");
    });

    it("should navigate to reports page", () => {
      cy.get('a[href*="/dashboard/reports"]').first().click();
      cy.url().should("include", "/dashboard/reports");
    });

    it("should navigate to order-pickup page", () => {
      cy.get('a[href*="/dashboard/order-pickup"]').first().click();
      cy.url().should("include", "/dashboard/order-pickup");
    });
  });

  context("4. Payment Flow - Deposit & Withdrawal", () => {
    beforeEach(() => {
      cy.login({
        phone: sampleUser.phone,
        password: sampleUser.password,
      });
    });

    it("should complete deposit process", () => {
      cy.visit("/dashboard/deposit");
      sleep(10000);

      cy.contains("button", FaContent.dashboard.transaction.pay).should(
        "be.disabled",
      );

      cy.get('input[name="amount"]').type("10000000");

      cy.get("body").then(($body) => {
        if ($body.find(".cards > div").length > 0) {
          cy.get(".cards > div").first().click();
        } else {
          cy.contains(
            ".MuiAlert-message > .MuiTypography-root",
            FaContent.dashboard.transaction.no_card_alert,
          ).should("exist");

          cy.get("button")
            .contains(FaContent.dashboard.transaction.add_card)
            .first()
            .click();

          cy.get('input[name="cardNumber"]').type("1234567890123456");
          cy.get('input[name="cardName"]').type("کارت تستی");

          cy.contains(
            ".MuiDialogActions-root > button",
            FaContent.dashboard.transaction.add,
          ).click();

          sleep(5000);

          cy.get(".cards > div").first().click();
        }
      });

      cy.contains("button", FaContent.dashboard.transaction.pay).should(
        "not.be.disabled",
      );

      cy.get("button").contains(FaContent.dashboard.transaction.pay).click();

      cy.contains('div [role="status"]', "واریزی با موفقیت انجام شد.").should(
        "exist",
      );
    });

    it("should complete withdrawal process", () => {
      cy.visit("/dashboard/withdraw");
      sleep(10000);

      cy.contains("button", FaContent.dashboard.transaction.pay).should(
        "be.disabled",
      );

      cy.get('input[name="amount"]').type("10000000");

      cy.get("body").then(($body) => {
        if ($body.find(".cards > div").length > 0) {
          cy.get(".cards > div").first().click();
        } else {
          cy.contains(
            ".MuiAlert-message > .MuiTypography-root",
            FaContent.dashboard.transaction.no_card_alert,
          ).should("exist");

          cy.get("button")
            .contains(FaContent.dashboard.transaction.add_card)
            .first()
            .click();

          cy.get('input[name="cardNumber"]').type("1234567890123456");
          cy.get('input[name="cardName"]').type("کارت تستی");

          cy.contains(
            ".MuiDialogActions-root > button",
            FaContent.dashboard.transaction.add,
          ).click();

          sleep(5000);

          cy.get(".cards > div").first().click();
        }
      });

      cy.contains("button", FaContent.dashboard.transaction.pay).should(
        "not.be.disabled",
      );

      cy.get("button").contains(FaContent.dashboard.transaction.pay).click();

      cy.contains('div [role="status"]', "برداشت با موفقیت انجام شد.").should(
        "exist",
      );
    });
  });

  context("5. Trading Flow", () => {
    beforeEach(() => {
      cy.login({
        phone: sampleUser.phone,
        password: sampleUser.password,
      });
      cy.visit("/dashboard/trade");
    });

    it("should place a buy", () => {
      sleep(10000);

      cy.request("POST", "http://localhost:3001/auth/login", {
        phone: sampleUser.phone,
        password: sampleUser.password,
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(201);

        const authToken = loginResponse.requestHeaders.cookie.split("=")[1];

        cy.request({
          method: "GET",
          url: "http://localhost:3001/auth/me",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).then((profileResponse) => {
          console.log(profileResponse);
          expect(profileResponse.status).to.eq(200);

          const userData = profileResponse.body;

          cy.get("button[type='button'] > p")
            .contains(FaContent.dashboard.trade.buy)
            .first()
            .click();

          cy.get('input[name="amount"]').type(userData.wallet.cashBalance);

          cy.get('button[type="submit"]')
            .contains(FaContent.dashboard.trade.buy)
            .click();

          cy.contains(
            'div [role="status"]',
            "خرید طلا با موفقیت انجام شد.",
          ).should("exist");
        });
      });
    });

    it("should place a sell", () => {
      sleep(10000);

      cy.request("POST", "http://localhost:3001/auth/login", {
        phone: sampleUser.phone,
        password: sampleUser.password,
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(201);

        const authToken = loginResponse.requestHeaders.cookie.split("=")[1];

        cy.request({
          method: "GET",
          url: "http://localhost:3001/auth/me",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).then((profileResponse) => {
          expect(profileResponse.status).to.eq(200);

          const userData = profileResponse.body;

          cy.get("button[type='button'] > p")
            .contains(FaContent.dashboard.trade.sell)
            .first()
            .click();

          cy.get('input[name="gram"]').type(userData.wallet.goldAmount);

          cy.get('button[type="submit"]')
            .contains(FaContent.dashboard.trade.sell)
            .click();

          cy.contains(
            'div [role="status"]',
            "فروش طلا با موفقیت انجام شد.",
          ).should("exist");
        });
      });
    });
  });
});
