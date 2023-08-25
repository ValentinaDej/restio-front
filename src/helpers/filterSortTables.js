export const filterTables = (
  tablesData,
  orders,
  isFavoriteTables,
  isFreeTables,
  isWaitingTables,
  isTakenTables,
  isTablesWithReadyDishes,
  isTablesWithAllPaidOrders
) => {
  let tablesFiltered = tablesData?.slice();

  if (isFavoriteTables) {
    tablesFiltered = tablesFiltered.filter((table) => table.isFavorite === true);
  }
  if (isFreeTables) {
    tablesFiltered = tablesFiltered.filter((table) => table.status === 'Free');
  }
  if (isTakenTables) {
    tablesFiltered = tablesFiltered.filter((table) => table.status === 'Taken');
  }
  if (isWaitingTables) {
    tablesFiltered = tablesFiltered.filter((table) => table.status === 'Waiting');
  }
  if (isTablesWithReadyDishes) {
    tablesFiltered = tablesFiltered.filter((table) => {
      const ordersForTable = orders.filter((order) => order.table_id._id === table._id);

      const hasReadyDishes = ordersForTable.some((order) =>
        order.orderItems.some((item) => item.status === 'Ready')
      );

      return hasReadyDishes;
    });
  }
  if (isTablesWithAllPaidOrders) {
    tablesFiltered = tablesFiltered.filter((table) => {
      // Find orders for this table
      const ordersForTable = orders.filter((order) => order.table_id._id === table._id);

      // Check if all orders are in "Paid" status
      const allOrdersPaid =
        ordersForTable.length > 0 && ordersForTable.every((order) => order.status === 'Paid');

      return allOrdersPaid;
    });
  }
  return { tables: tablesFiltered };
};

export const sortTables = (filteredTables) => {
  const sortedByFavorite = filteredTables?.tables?.sort((a, b) => {
    const aIsFavorite = a.isFavorite || false;
    const bIsFavorite = b.isFavorite || false;

    if (aIsFavorite && !bIsFavorite) {
      return -1;
    } else if (!aIsFavorite && bIsFavorite) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedByFavorite;
};
