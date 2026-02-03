import {useState,useEffect} from 'react'


const dummyUsers = [
  {
    id: "U001",
    name: "Anshif P",
    email: "anshif@gmail.com",
    lastActive: "2 Feb 2026",
    active: true,
  },
  {
    id: "U002",
    name: "Rahul K",
    email: "rahul@gmail.com",
    lastActive: "28 Jan 2026",
    active: false,
  },
];

function UserList() {


    const [users, setUsers] = useState(dummyUsers);

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, active: !u.active } : u
      )
    );
  };
  return (

     <div className="min-h-screen bg-[#0f172a] p-8 text-white">
      <h1 className="text-3xl text-center font-bold mb-8">Users</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition"
          >
            {/* Big Name */}
            <h2 className="text-2xl font-bold mb-3 text-cyan-400">
              {user.name}
            </h2>

            {/* Details */}
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-slate-400">
                  User ID:
                </span>{" "}
                {user.id}
              </p>

              <p>
                <span className="font-semibold text-slate-400">
                  Email:
                </span>{" "}
                {user.email}
              </p>

              <p>
                <span className="font-semibold text-slate-400">
                  Last Active:
                </span>{" "}
                {user.lastActive}
              </p>
            </div>

            {/* Status + Toggle */}
            <div className="mt-5 flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {user.active ? "Active" : "Non-Active"}
              </span>

              <button
                onClick={() => toggleStatus(user.id)}
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                {user.active ? "Non-Active" : "Active"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList