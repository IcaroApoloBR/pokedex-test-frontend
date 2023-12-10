import { ErrorMessage } from "../components/ErrorMessage";
import { storageUserGet } from "../storage/storageUser";
import { User } from "../types/User";
import moment from "moment";

function Profile() {
    const user: User = storageUserGet() || {
        token: "",
        email: "",
        id: "",
        name: "",
        created_at: "",
    };

    return (
        <section className="w-full h-full bg-whiteSecondary dark:bg-darkPrimary">
            <main className="pt-40 p-6 min-h-screen flex justify-center">
                <div className="flex flex-col gap-4 text-gray-900 dark:text-gray-200">
                    <h2>
                        Hello pokemon trainer <b>{user.name}</b>, welcome
                    </h2>
                    <span>
                        Your system access email is <b>{user.email}</b>
                    </span>
                    <span>
                        Wow!, You've been a pokemon trainer{" "}
                        <b>{moment(user.created_at).format("LL")}</b>
                    </span>
                </div>
            </main>

            {!user && (
                <ErrorMessage message="* Unfortunately, your session has expired. Please log in again." />
            )}
        </section>
    );
}

export default Profile;
