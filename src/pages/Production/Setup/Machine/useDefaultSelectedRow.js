import { useState, useEffect } from 'react';

export function useDefaultSelectedRow(data, selectedRowFn) {
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const isFirstRender = selectedRow === null;

      if (isFirstRender) {
        selectedRowFn(data[0], 0); // Select the first row on page refresh
      } else {
        // Handle updates that might change the selectedRow
      }
    }
  }, [data, selectedRow, selectedRowFn]);

  return selectedRow;
}
