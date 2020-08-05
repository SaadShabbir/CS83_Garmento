import React from 'react';
import MainChart from './charts/MainChart';
import ProductsChart from './charts/ProductsChart';
import OrdersChart from './charts/OrdersChart';
import VisitorsChart from './charts/VisitorsChart';
import NewUsersChart from './charts/NewUsersChart';
import NewCustomersChart from './charts/NewCustomersChart';
import NewVendorsChart from './charts/NewVendorsChart';

import '../../../CSS/adminPanel/dashboard.css';

const Dashboard = () => {
  return (
    <div className="admin-home__main-section">
      <section className="dashboard__mini-charts">
        <ProductsChart className="dashboard__mini-charts__chart--small" />
        <OrdersChart className="dashboard__mini-charts__chart--small" />
        <VisitorsChart className="dashboard__mini-charts__chart--small" />
      </section>
      <MainChart className="dashboard__main-chart" />
      <section className="dashboard__mini-charts dashboard__mini-charts--medium">
        <NewUsersChart className="dashboard__mini-charts__chart--medium" />
        <NewCustomersChart className="dashboard__mini-charts__chart--medium" />
        <NewVendorsChart className="dashboard__mini-charts__chart--medium" />
      </section>
    </div>
  );
};
export default Dashboard;
