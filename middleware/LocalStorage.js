export const localSave = (store) => (next) => (action) => {
  if (action.type === "cart/buyItem") {
    const addNewitemPurchased = (item) => {
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
  } else if (action.type === "cart/addToCart") {
    const addNewitemToCart = (item) => {
      if (item) {
        const isAvail = localStorage.getItem("cart");
        if (isAvail) {
          let prev = JSON.parse(localStorage.getItem("cart"));
          return JSON.stringify([...prev, item]);
        } else return JSON.stringify([item]);
      }
    };
    localStorage.setItem("cart", addNewitemToCart(action.payload));
  } else if (action.type === "cart/deleteFromCartById") {
    const deleteItemFromCart = (item) => {
      if (item) {
        const prev = JSON.parse(localStorage.getItem("cart"));
        if (prev) {
          const newVal = prev.filter((cart) => cart.id != action.payload);
          return JSON.stringify(newVal);
        }
      }
    };
    localStorage.setItem("cart", deleteItemFromCart(action.payload));
  } else if (action.type === "cart/getCoins") {
    const addCoins = (coins) => {
      if (coins) {
        let prevCoins = localStorage.getItem("coins");
        if (prevCoins === null) {
          return 1000000 + parseInt(coins);
        } else return parseInt(prevCoins) + parseInt(coins);
      }
    };
    localStorage.setItem("coins", addCoins(action.payload));
  } else if (action.type === "cart/UseTicket") {
    const subTicket = (tickets) => {
      if (tickets) {
        let prevtickets = localStorage.getItem("tickets");
        if (prevtickets === null) {
          return 1 - parseInt(tickets);
        } else return parseInt(prevtickets) - parseInt(tickets);
      }
    };
    localStorage.setItem("tickets", subTicket(1));
  } else if (action.type === "cart/getTicket") {
    const addTicket = (tickets) => {
      if (tickets) {
        let prevtickets = localStorage.getItem("tickets");
        if (prevtickets === null) {
          return 1 + parseInt(tickets);
        } else return parseInt(prevtickets) + parseInt(tickets);
      }
    };
    localStorage.setItem("tickets", addTicket(action.payload));
  }
  return next(action);
};
