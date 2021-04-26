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

  it("should return 1 deal when productFilter is set to broadband and mobile", () => {
    sut.setProductFilter("broadband");
    sut.setProductFilter("mobile");
    const result = sut.deals;
    expect(result.length).toEqual(1);
  });

  it("should return 1 sky only deal when providerFilter is set to Sky", () => {
    sut.setProviderFilter("1");
    const result = sut.deals;
    expect(result.legnth).toEqual(1);
    expect(result[0].provider.id).toEqual(1);
  });
});
