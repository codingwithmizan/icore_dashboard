import { getData } from "@/lib/services/api";

type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
};

const UserListPage = async () => {
  const res = await getData<{ users: User[] }>("users");
  const users = res.data?.users || [];
  return (
    <div>
      <h2>Render User List</h2>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
