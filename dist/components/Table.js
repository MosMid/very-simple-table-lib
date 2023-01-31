"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.array.sort.js");
var _react = _interopRequireWildcard(require("react"));
require("./styles/table.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Table(prop) {
  const tableKeys = prop.tableKeys;
  const [data, setData] = (0, _react.useState)(prop.data);
  const keys = Object.keys(tableKeys);
  const search = event => {
    setOffset(0);
    setCurrentPage(1);
    setData(prop.data.filter(item => keys.some(key => item[key].toLowerCase().includes(event.target.value))));
  };
  const [offset, setOffset] = (0, _react.useState)(0);
  const [limit, setLimit] = (0, _react.useState)(25);
  const [dataToShow, setDataToShow] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setDataToShow(data.slice(offset, offset + limit));
  }, [data, offset, limit]);
  const handleLimitChange = event => {
    setLimit(parseInt(event.target.value, 10));
    setOffset(0);
    setCurrentPage(1);
  };
  const beforeStyle = {
    position: "absolute",
    display: "block",
    width: 0,
    height: 0,
    borderLeft: '3.5px solid transparent',
    borderRight: '3.5px solid transparent',
    borderBottom: '3.5px solid #E0E0E0',
    top: "25%",
    right: "-5px"
  };
  const afterStyle = {
    position: "absolute",
    display: "block",
    width: 0,
    height: 0,
    borderLeft: '3.5px solid transparent',
    borderRight: '3.5px solid transparent',
    borderTop: '3.5px solid #E0E0E0',
    bottom: "25%",
    right: "-5px"
  };
  const [sortOrder, setsortOrder] = (0, _react.useState)("desc");
  function sortBy(column) {
    let key = Object.keys(tableKeys).find(k => tableKeys[k] === column);
    if (sortOrder === "desc") setsortOrder("asc");else setsortOrder("desc");
    if (sortOrder === "asc") {
      data.sort((a, b) => a[key] > b[key] ? 1 : -1);
    } else {
      data.sort((a, b) => a[key] < b[key] ? 1 : -1);
    }
    setDataToShow(data.slice(offset, offset + limit));
  }
  function changeStyle(e) {
    for (let i = 0; i < e.parentElement.parentElement.childNodes.length; i++) {
      e.parentElement.parentElement.childNodes[i].childNodes[1].childNodes[0].style.borderBottom = '3.5px solid #E0E0E0';
      e.parentElement.parentElement.childNodes[i].childNodes[1].childNodes[1].style.borderTop = '3.5px solid #E0E0E0';
    }
    if (sortOrder === "asc") {
      e.parentElement.childNodes[1].childNodes[0].style.borderBottom = '3.5px solid black';
      e.parentElement.childNodes[1].childNodes[1].style.borderTop = '3.5px solid #E0E0E0';
    } else {
      e.parentElement.childNodes[1].childNodes[0].style.borderBottom = '3.5px solid #E0E0E0';
      e.parentElement.childNodes[1].childNodes[1].style.borderTop = '3.5px solid black';
    }
  }
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  (0, _react.useEffect)(() => {
    handlePageChange(currentPage);
  }, [currentPage]);
  const handlePageChange = pageNumber => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(data.length / limit)) {
      setOffset((pageNumber - 1) * limit);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "employee-div",
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "head"
  }, /*#__PURE__*/_react.default.createElement("label", null, "show", /*#__PURE__*/_react.default.createElement("select", {
    value: limit,
    onChange: handleLimitChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: 25
  }, "25"), /*#__PURE__*/_react.default.createElement("option", {
    value: 50
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    value: 100
  }, "100")), "entries"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "search",
    onKeyUp: search
  })), /*#__PURE__*/_react.default.createElement("table", {
    id: "employee-table",
    className: "display"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, Object.values(tableKeys).map((key, index) => /*#__PURE__*/_react.default.createElement("td", {
    key: index,
    className: "tableKeys"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      sortBy(key);
      changeStyle(e.currentTarget);
    }
  }, key), /*#__PURE__*/_react.default.createElement("div", {
    className: "sortArrow ".concat(sortOrder ? "asc" : "desc")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "before",
    style: beforeStyle
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "after",
    style: afterStyle
  })))))), /*#__PURE__*/_react.default.createElement("tbody", null, dataToShow.map((employee, index) => /*#__PURE__*/_react.default.createElement("tr", {
    className: "lines",
    key: index
  }, Object.keys(tableKeys).map((key, index) => /*#__PURE__*/_react.default.createElement("td", {
    key: index
  }, employee[Object.keys(employee).find(k => k === key)])))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "foot"
  }, /*#__PURE__*/_react.default.createElement("p", null, "showing ", dataToShow.length, " of ", data.length, " entries"), /*#__PURE__*/_react.default.createElement("div", {
    id: "pageNo"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCurrentPage(1),
    disabled: currentPage <= 1
  }, "\u226A"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCurrentPage(currentPage - 1),
    disabled: currentPage <= 1
  }, "\u227A"), /*#__PURE__*/_react.default.createElement("span", null, currentPage, " / ", Math.ceil(data.length / limit)), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCurrentPage(currentPage + 1),
    disabled: currentPage >= Math.ceil(data.length / limit)
  }, "\u227B"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCurrentPage(Math.ceil(data.length / limit)),
    disabled: currentPage >= Math.ceil(data.length / limit)
  }, "\u226B"))));
}
var _default = Table;
exports.default = _default;