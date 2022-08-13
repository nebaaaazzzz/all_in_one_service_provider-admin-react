import React from "react";

function Pagination({
  page,
  setPage,
  disableNextPagePagination,
  validToGoNextPage,
}) {
  return (
    <nav className="app-pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item  ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            href="#"
            tabIndex="-1"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            aria-disabled="true"
          >
            Previous
          </button>
        </li>
        {[page, page + 1, page + 2].map((p, index) => {
          return (
            <li className={`page-item ${page == p ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(p)}>
                {p}
              </button>
            </li>
          );
        })}
        {/* <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li> */}
        <li
          className={`page-item ${disableNextPagePagination ? "disabled" : ""}`}
        >
          <button
            disabled={disableNextPagePagination}
            onClick={() => {
              console.log(disableNextPagePagination);
              //   if (validToGoNextPage) {
              // }
              setPage((old) => old + 1);
            }}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
