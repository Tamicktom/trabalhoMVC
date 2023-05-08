//* Libraries imports
import { Router } from "express";

//* Local imports
import CreateUserController from "./controllers/user/CreateUserController";
import DetailUserController from "./controllers/user/DetailUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import AddCreditCardController from "./controllers/creditCard/AddCreditCardController";
import CreateTokenCreditCardController from "./controllers/creditCard/CreateTokenCreditCardController";
import isAuthenticated from "./middlewares/isAuthenticated";

const routes = Router();

routes.post("/user", new CreateUserController().handle);
routes.post("/session", new AuthUserController().handle);
routes.get("/userinfo", isAuthenticated, new DetailUserController().handle);

routes.post(
  "/addCreditCard",
  isAuthenticated,
  new AddCreditCardController().handle
);
routes.post("/createToken", new CreateTokenCreditCardController().handle);

export { routes };
