import React, { Fragment, useEffect } from "react";
import "../Order/orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors, getOrderSysDetails } from "../../actions/orderSysAction";


const OrderDetail = ({ match }) => {
    const { orderSystem, error, loading } = useSelector((state) => state.orderSystemDetails);

    const dispatch = useDispatch();
    const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderSysDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Mã hóa đơn #{orderSystem && orderSystem._id}
              </Typography>
              <Typography>Thông tin người đặt</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Người tạo:</p>
                  <span>{orderSystem.user && orderSystem.user.name}</span>
                </div>
                <div>
                  <p>Ghi chú:</p>
                  <span>
                    {orderSystem.note}
                  </span>
                </div>
              </div>
              <Typography>Trạng thái đơn</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                        orderSystem.orderStatus && orderSystem.orderStatus === "Đã trả"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {orderSystem.orderStatus && orderSystem.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Đơn gồm:</Typography>
              <div className="orderDetailsCartItemsContainer">
               <p> Người mượn: {orderSystem.nameBorrow}</p>
               <p> Tên sách: {orderSystem.nameProduct}</p>
               <p> Số lượng: {orderSystem.quantity}</p>
               <p> Số ngày mượn: {orderSystem.numberOfDays}</p>
               <p> Mượn từ ngày: {orderSystem.createdAt}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
};

export default OrderDetail
