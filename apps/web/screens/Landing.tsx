import { AppbarClient } from "../components/AppbarClient";
import Footer from "./Footer";

export async function Landing() {

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div>
                <AppbarClient />
                <div>
                    <h1>Test your apti skills</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}
