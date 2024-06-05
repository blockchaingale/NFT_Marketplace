import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { animateScroll } from "react-scroll";

import styles from "./pagination.module.css";

const AppPagination = ({ callback, rawData, pageSize, scroll = true }) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    let data = rawData.slice(pagination.from, pagination.to);
    if (data.length === 0) {
      data = rawData.slice(0, 9);
    }
    setPagination((prevstate) => {
      return { ...prevstate, count: rawData.length };
    });
    callback(data);
  }, [rawData, callback, pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    //scroll to top of page
    scroll && animateScroll.scrollToTop();

    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination((prevstate) => {
      return { ...prevstate, from, to };
    });
  };
  return (
    <div className={styles.paginationContainer}>
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default AppPagination;
