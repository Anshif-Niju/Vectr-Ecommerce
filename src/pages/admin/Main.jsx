import { useNavigate } from 'react-router-dom';
import { useStats } from '../../context/StatsContext';
function Main() {
  const navigate = useNavigate();
  const { stats } = useStats();

  const recentOrders = stats.orders.slice(-3);
  const totalPrice = (product) => {
    const total = product.reduce((total, item) => total + item.price, 0);
    return total;
  };

  console.log(recentOrders);
  return (
    <main className="flex-1 p-6 md:p-8 w-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white text-3xl hover:text-cyan-400 transition"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <h2 className="text-3xl font-semibold text-white">Dashboard</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-slate-400">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-white">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-slate-400">Orders</h3>
          <p className="text-3xl font-bold mt-2 text-white">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-slate-400">Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-green-400">
            {stats.totalRevenue}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-slate-400">Products</h3>
          <p className="text-3xl font-bold mt-2 text-white">
            {stats.totalProducts}
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-white">Recent Orders</h3>

        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="py-3">Order ID</th>
              <th>User</th>
              <th>Status</th>
              {/* <th>Item Id</th> */}
              {/* <th>size</th> */}
              <th>date</th>
              <th>payment</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-700 hover:bg-slate-700 transition"
              >
                <td className="py-3">{item.id}</td>
                <td>{item.address.name}</td>
                <td className="text-green-400">{item.status}</td>

                {/* {
                item.product.map((product)=>(

                  <>
                    <td key={product.productId} className="text-green-400">{product.productId}</td>
                    <td className="text-green-400">{product.size}</td>
                  </>
                  ))
                } */}
                <td>{item.orderDate}</td>
                <td>{item.payment}</td>

                <td>${totalPrice(item.product)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Main;
