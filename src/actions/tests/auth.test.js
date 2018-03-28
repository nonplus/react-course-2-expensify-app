import { login, logout } from "../auth";

describe("auth actions", () => {
  describe("login", () => {
    it("should generate login action object", () => {
      const uid = "uid";
      const action = login(uid);
      expect(action).toEqual({
        type: "LOGIN",
        uid
      });
    });
  });

  describe("logout", () => {
    it("should generate logout action object", () => {
      const action = logout();
      expect(action).toEqual({
        type: "LOGOUT"
      });
    });
  });
});
