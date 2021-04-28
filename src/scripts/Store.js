import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null,
    };
    this.filterState = this.filterState.bind(this);
  }

  get deals() {
    return this.filter();
  }

  filter() {
    return this.state.deals.filter(this.filterState);
  }

  filterState(deal) {
    return (
      this.DealOfferedByProviderFilterState(deal) &&
      this.DealProductTypesFromFilterState(deal)
    );
  }

  DealOfferedByProviderFilterState(deal) {
    return (
      !this.ProviderFilterStateSet() ||
      deal.provider.id === this.state.providerFilter
    );
  }

  ProviderFilterStateSet() {
    return !!this.state.providerFilter;
  }

  DealProductTypesFromFilterState(deal) {
    return (
      !this.ProductFilterStateSet() ||
      this.DealProductsForFiltering(deal) === this.productFilters
    );
  }

  ProductFilterStateSet() {
    return this.state.productFilters && this.state.productFilters.length > 0;
  }

  DealProductsForFiltering(deal) {
    return deal.productTypes
      .filter((productType) => productType !== "Phone")
      .map((productType) =>
        productType === "Fibre Broadband"
          ? "broadband"
          : productType.toLowerCase()
      )
      .filter(
        (productType, index, array) => array.indexOf(productType) === index
      )
      .sort()
      .join("");
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
