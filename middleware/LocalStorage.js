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
  } else if (action.type === "cart/GetTicket") {
    const addTicket = (tickets) => {
      if (tickets) {
        let prevtickets = localStorage.getItem("tickets");
        if (prevtickets === null) {
          return 1 + parseInt(tickets);
        } else return parseInt(prevtickets) + parseInt(tickets);
      }
    };
    localStorage.setItem("tickets", addTicket(1));
  }
  return next(action);
};
