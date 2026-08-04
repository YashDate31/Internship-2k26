import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const limit = 5;

    const getUsers = async () => {

        const res = await axios.get(
            `http://localhost:5000/users?page=${page}&limit=${limit}`
        );

        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        getUsers();
    }, [page]);

    return (
        <div>

            <h2>User List</h2>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>
                                    <Link className="btn btn-warning me-2" to={`/edit/${u.id}`}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
            <br />
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}>
                Previous
            </button>
            <span style={{ margin: "0 20px" }}>
                Page {page} of {totalPages}
            </span>
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}>
                Next
            </button>

        </div>
    );
}

export default Users;
