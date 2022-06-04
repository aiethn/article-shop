export const localSave = (store) => (next) => (action) => {
  if (action.type === "cart/buyItem") {
    const addNewitemPurchased = (item, coins) => {
      if (item) {
        let prev = JSON.parse(localStorage.getItem("purchased"));
        if (prev != null) {
          return JSON.stringify([...prev, item]);
        } else return JSON.stringify([item]);
      }
    };
    const subCoins = (coins) => {
      if (coins) {
        let newVal = localStorage.getItem("coins");
        if (newVal != null) {
          newVal -= coins;
          return newVal;
        } else return 100000 - coins;
      }
    };
    localStorage.setItem(
      "purchased",
      addNewitemPurchased(action.payload.itemPurchased)
    );
    localStorage.setItem("coins", subCoins(action.payload.coins));
  }
  return next(action);
};
