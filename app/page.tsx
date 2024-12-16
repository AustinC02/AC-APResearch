import { bt2 } from "./fonts";
import Image from "next/image";
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src={"./ForeSite.svg"} alt={"ForeSite Logo"} width={200} height={200} className={"mb-10"} />
            <h1 className="text-4xl font-bold text-center">Welcome to {" "}
                <span className={bt2.className}>
                    <span className={"text-[#FE904F]"}>Fore</span>
                    <span className={"text-[#4076FF]"}>Site</span>
                </span>
            </h1>
        <p className="text-lg text-center">
            This site is not real and not functional. The site is a part of a research experiment.
        </p>
        </div>
    );
}
