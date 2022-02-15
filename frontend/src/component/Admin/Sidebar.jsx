import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Sách">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="Tất cả sách" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Tạo sách mới" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>


      <Link>

      <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ListAltIcon />}
        >
          <TreeItem nodeId="1" label="Hóa đơn">
            <Link to="/admin/orders/online">
              <TreeItem nodeId="2" label="Lịch sử mượn online" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/orders/offline">
              <TreeItem nodeId="2" label="Lịch sử mượn trực tiếp" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/order">
              <TreeItem nodeId="3" label="Mượn sách" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Tài khoản
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Đánh giá
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
