import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DELETE_ORDER_RESET } from '../../constants/orderSysConstants';
import { clearErrors, deleteOrderSystem, getOrderSystem } from "../../actions/orderSysAction";

const OrderListOff = ({history}) => {
    const dispatch = useDispatch();

  const alert = useAlert();

  const { error, ordersSystem } = useSelector((state) => state.allOrderSystem);

  const { error: deleteError, isDeleted } = useSelector((state) => state.orderSystem);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderSystem(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Trả sách thành công");
      history.push("/admin/orders/offline");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getOrderSystem());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Mã mượn", minWidth: 50, flex: 1 },
    {
        field: "user",
        headerName: "Tên người mượn",
        minWidth: 50,
        flex: 1
        },
        {
            field: "nameProduct",
            headerName: "Tên sách",
            minWidth: 150,
            flex: 1
            },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 1,
    },

      {
        field: "numberOfDay",
        headerName: "Số ngày",
        type: "number",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "date",
        headerName: "Ngày tạo",
        type: "number",
        minWidth: 150,
        flex:1,
      },

    {
      field: "actions",
      flex:1,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <p>Trả sách</p>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  ordersSystem &&
  ordersSystem.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.nameBorrow,
        nameProduct: item.nameProduct,
        itemsQty: item.quantity,
        numberOfDay: item.numberOfDays,
        date: item.createdAt,
        status: item.orderStatus,
      });
    });
    return (
        <Fragment>
        <MetaData title={`Lịch sử mượn trực tiếp - Admin`} />

        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">Danh sách người mượn</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    )
}

export default OrderListOff
