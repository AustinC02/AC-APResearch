import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="flex justify-center items-center bg-gray-300 w-full h-16 fixed top-0 shadow-md">
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