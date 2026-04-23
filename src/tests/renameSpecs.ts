import renameThumb from "../utilities/rename";

describe("renameThumb helper", () => {
  it("Should be defined", () => {
    expect(renameThumb).toBeDefined();
  });

  it("Should properly rename a correct image name", () => {
    expect(renameThumb("test.jpg")).toEqual("test_thumb.jpg");
  });

  it("Should throw error if filename is invalid", () => {
    expect(() => renameThumb(".jpg")).toThrowError("File must have valid name");
  });

  it("Should throw error if file is not JPG", () => {
    expect(() => renameThumb("test.png")).toThrowError(
      "Invalid file type. Only JPG supported.",
    );
  });
});
