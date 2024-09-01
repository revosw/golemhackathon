import { getSelf } from "./api/auth";
import { LoginForm } from "./components/LoginForm";
import { LoggedIn } from "./components/LoggedIn";
import MyApp from "./pages/_app";

export default async function Home() {
	// This route is for showing your own timeline, or a login page
    const self = await getSelf();
    console.log(self)

    return (
        <>
        <MyApp />
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{self ? <LoggedIn self={self} /> : <LoginForm />}
		</main>
        </>
	);
}
