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
const getActivitiesWithSuppliers = (activities, suppliers) => activities
  .map(activity => ({
    ...activity,
    supplier: suppliers.find(supplier => supplier.id === activity.supplierId)
  }));

/**
 * Sorts an array of activities by their `specialOffer` status, placing those with special offers first.
 * 
 * This function modifies the original array by sorting its elements in place. Activities with `specialOffer`
 * set to `true` are moved to the beginning of the array, followed by activities without special offers.
 * It assumes that the `specialOffer` property is a boolean, using a subtraction operation to determine
 * the sort order. This means activities with `specialOffer: true` are considered "greater" than those
 * with `specialOffer: false` for the purposes of sorting.
 * 
 * @param {Array.<{id: number, title: string, specialOffer: boolean}>} activities - The array of activity objects to be sorted. Each activity object must include at least an `id`, a `title`, and a `specialOffer` boolean property.
 * @returns {Array.<{id: number, title: string, specialOffer: boolean}>} The sorted array of activities, with those having `specialOffer: true` placed before those with `specialOffer: false`.
 * 
 * @example
 * // Sorting an array of activities where some have special offers
 * const activities = [
 *   { id: 1, title: 'Activity 1', specialOffer: false },
 *   { id: 2, title: 'Activity 2', specialOffer: true },
 *   { id: 3, title: 'Activity 3', specialOffer: false }
 * ];
 * const sortedActivities = sortBySpecialOffer(activities);
 * console.log(sortedActivities);
 * // Output: [{ id: 2, title: 'Activity 2', specialOffer: true }, { id: 1, title: 'Activity 1', specialOffer: false }, { id: 3, title: 'Activity 3', specialOffer: false }]
 */
const sortBySpecialOffer = (activities) => activities
  .sort((a, b) => b.specialOffer - a.specialOffer);

/**
 * Returns a random item from the provided array.
 * If the array is empty, it returns `undefined`.
 *
 * @param {Array} array - The array from which to pick a random item.
 * @returns {*} The random item from the array. The return type depends on the array's content.
 *
 * @example
 * // Example usage for an array of numbers
 * const numbers = [1, 2, 3, 4, 5];
 * const randomNumber = getRandomArrayItem(numbers);
 * console.log(randomNumber); // Logs a random number from the numbers array
 *
 * @example
 * // Example usage for an array of strings
 * const colors = ["red", "green", "blue", "yellow"];
 * const randomColor = getRandomArrayItem(colors);
 * console.log(randomColor); // Logs a random color from the colors array
 */
function getRandomArrayItem(array) {
  if (!array.length) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export { getActivitiesWithSuppliers, sortBySpecialOffer, getRandomArrayItem };