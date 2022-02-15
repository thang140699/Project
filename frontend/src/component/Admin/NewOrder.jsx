import React, { Fragment, useEffect, useState } from "react";
import "./NewOrder.css";
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { CREATE_ORDER_RESET } from '../../constants/orderSysConstants';
import { clearErrors } from "../../actions/orderSysAction";
import { createOrder } from '../../actions/orderSysAction';


const NewOrder = ({ history }) => {
    const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newOrderSystem);
  const [nameProduct, setNameProduct] = useState("");
  const [nameBorrow, setNameBorrow] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Mượn sách");
      history.push("/admin/dashboard");
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("nameProduct", nameProduct);
    myForm.set("nameBorrow", nameBorrow);
    myForm.set("quantity", quantity);
    myForm.set("numberOfDays", numberOfDays);
    myForm.set("note", note);

    dispatch(createOrder(myForm));
  };

    return (
        <Fragment>
        <MetaData title="Tạo hóa đơn" />
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createOrderSubmitHandler}
            >
              <h1>Mượn sách</h1>

              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Tên sách"
                  required
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
                />
              </div>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Tên người mượn"
                  required
                  value={nameBorrow}
                  onChange={(e) => setNameBorrow(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Số lượng"
                  required
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Số ngày"
                  required
                  onChange={(e) => setNumberOfDays(e.target.value)}
                />
              </div>

              <div>
                <DescriptionIcon />

                <textarea
                  placeholder="Ghi chú"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Mượn
              </Button>
            </form>
          </div>
        </div>
      </Fragment>
    )
}

export default NewOrder
