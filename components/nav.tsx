import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
    return (
        <nav className="flex justify-between flex-row items-center max-w-4xl bg-gray-300 mx-auto w-full h-16 fixed top-0 shadow-md px-4 py-3 sm:px-6">
            <Image src={"/ForeSite.svg"} alt={"ForeSite Logo"} width={50} height={50} />
            <ul className="flex space-x-16">
                <li>
                    <Link href="/" className="text-gray-700 hover:text-gray-900">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/Basic" className="text-gray-700 hover:text-gray-900">
                        Basic
                    </Link>
                </li>
                <li>
                    <Link href="/Traditional" className="text-gray-700 hover:text-gray-900">
                        Traditional
                    </Link>
                </li>
                <li>
                    <Link href="/3D-GS" className="text-gray-700 hover:text-gray-900">
                        3D-GS
                    </Link>
                </li>
            </ul>
        </nav>
    );
}