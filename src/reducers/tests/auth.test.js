import authReducer from "../auth";

describe("authReducer", () => {
  describe("@@INIT", () => {
    it("should set default state", () => {
      expect(authReducer(undefined, { type: "@@INIT" })).toEqual({});
    });
  });

  describe("LOGIN", () => {
    it("should set uid", () => {
      const uid = "uid";
      expect(authReducer({}, { type: "LOGIN", uid })).toEqual({ uid });
    });
  });

  describe("LOGOUT", () => {
    it("should clear uid", () => {
      const uid = "uid";
      expect(authReducer({ uid }, { type: "LOGOUT" })).toEqual({});
    });
  });
});
