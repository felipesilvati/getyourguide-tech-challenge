/**
 * Enhances a list of activities with their corresponding supplier information.
 * Each activity object is augmented with a `supplier` field that contains the
 * details of the matching supplier, identified by `supplierId`. If no matching
 * supplier is found, the `supplier` field will be set to `undefined`.
 *
 * @param {Array.<{id: number, title: string, price: number, currency: string, rating: number, specialOffer: boolean, supplierId: number}>} activities - An array of activity objects. Each activity has an `id`, `title`, `price`, `currency`, `rating`, `specialOffer`, and `supplierId` properties.
 * @param {Array.<{id: number, name: string, address: string, zip: string, city: string, country: string}>} suppliers - An array of supplier objects. Each supplier has an `id`, `name`, `address`, `zip`, `city`, and `country` properties.
 * @returns {Array.<{id: number, title: string, price: number, currency: string, rating: number, specialOffer: boolean, supplierId: number, supplier: ?{id: number, name: string, address: string, zip: string, city: string, country: string}}>} - An array of activity objects enriched with a `supplier` property containing the supplier's details if a matching `supplierId` is found, otherwise `undefined`.
 */
exports.getActivitiesWithSuppliers = (activities, suppliers) => activities
  .map(activity => ({
    ...activity,
    supplier: suppliers.find(supplier => supplier.id === activity.supplierId)
  }));
