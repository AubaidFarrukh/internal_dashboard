import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import { Dashboard } from "../pickingDashboard";
import { CustomerOrders } from "../customerOrders";
import { ZReports } from "../zReports";
import { NotGivenReports } from "../notGiven";
import { OrderDetails } from "../orderDetails";
import { Products } from "../products";
import { ProductDetails } from "../productDetails";
import { SigninPage } from "../signinPage";
import { UsersPage } from "../users";
import { UserDetailsPage } from "../userDetails";
import { CreateUser } from "../createUser";
import { DeliveryAndDispatch } from "../deliveyAndDispatch";
import { AddNewRoutePage } from "../addNewRoute";
import { EditRoutePage } from "../editRoute";
import { BarcodeReport } from "../barcodeReports";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="signin" element={<SigninPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="orders/:orderNumber" element={<OrderDetails />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="delivery-and-dispatch" element={<DeliveryAndDispatch />} />
        <Route
          path="delivery-and-dispatch/add-new-route"
          element={<AddNewRoutePage />}
        />
        <Route
          path="delivery-and-dispatch/edit-route"
          element={<EditRoutePage />}
        />
        <Route path="users-and-permissions" element={<UsersPage />} />
        <Route
          path="users-and-permissions/:name"
          element={<UserDetailsPage />}
        />
        <Route path="add-new-user" element={<CreateUser />} />
        <Route path="daily-z-report" element={<ZReports />} />
        <Route path="not-given-reports" element={<NotGivenReports />} />
        <Route path="barcode-addition-reports" element={<BarcodeReport />} />
      </Route>
    </Routes>
  );
};

export default App;
