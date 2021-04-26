import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let sut;
  beforeEach(() => {
    sut = new Store();
    sut.setDeals(mockData.deals);
  });

  it("should return all deals when no filters applied", () => {
    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  it("should return 4 deals when productFilter = broadband", () => {
    sut.setProductFilter("broadband");
    const result = sut.deals;
    expect(result.length).toEqual(4);
  });

  it("should return 4 deals when productFilter is set to broadband and tv", () => {
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");
    const result = sut.deals;
    expect(result.length).toEqual(4);
  });
});
