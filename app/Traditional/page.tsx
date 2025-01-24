'use client'
import {SetStateAction, useState} from 'react';
import Image from 'next/image';
import {ReactPhotoSphereViewer} from "react-photo-sphere-viewer";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [current360Image, setCurrent360Image] = useState('/B_Center.JPG');

    const images = [
        "/IMG_5615.jpeg",
        "/IMG_5616.jpeg",
        "/IMG_5617.jpeg",
        "/IMG_5618.jpeg",
        "/IMG_5619.jpeg",
        "/IMG_5620.jpeg",
        "/IMG_5621.jpeg",
        "/IMG_5622.jpeg",
        "/IMG_5623.jpeg",
        "/IMG_5624.jpeg",
        "/IMG_5625.jpeg",
        "/IMG_5626.jpeg",
        "/IMG_5627.jpeg",
        "/IMG_5628.jpeg",
    ];

    const locations = [
        {id: 1, name: "B_Center", src: "/B_Center.JPG", top: '45%', left: '40%'},
        {id: 2, name: "B_Couch", src: "/B_Couch.JPG", top: '20%', left: '45%'},
        {id: 3, name: "B_Tile", src: "/B_Tile.JPG", top: '75%', left: '40%'},
        {id: 4, name: "B_Piano", src: "/B_Piano.JPG", top: '45%', left: '70%'},
    ];


    function getRandom(arr: string | string[], n: number) {
        // eslint-disable-next-line prefer-const
        let result = new Array(n),
            len = arr.length,
            // eslint-disable-next-line prefer-const
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    const imgs = getRandom(images, 6);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const selectImage = (index: SetStateAction<number>) => {
        if (index !== currentImageIndex) {
            setCurrentImageIndex(index);
        }
    };


    const openWalkthrough = () => setIsWalkthroughOpen(true);
    const closeWalkthrough = () => setIsWalkthroughOpen(false);

    const handleNodeClick = (image: string) => {
        setCurrent360Image(image);
    }

    return (
        <div className={"w-full max-w-4xl p-4 bg-blue-100 rounded-lg shadow-lg"}>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8 mt-32">
                <div className={"flex flex-wrap w-full lg:w-1/2 md:w-1/2 xl:w-full p-2"}>
                    {imgs.map((image, index) => (
                        <div key={index} className={"flex-grow border-2"}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Image
                                src={image}
                                alt={`Photo ${index + 1}`}
                                width={800}
                                height={600}
                                className="xl:max-w-64 xl:max-h-64 lg:max-w-48 lg:max-h-48 sm:max-w-32 sm:max-h-32"
                            />
                        </div>
                    ))}
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-2">Address: 1234 Example St</h1>
                    <h2 className="text-xl text-green-600 mb-4">Price: $1,000,000</h2>
                    <h3 className="text-lg mb-2">Realtor: John Doe</h3>
                    <h4 className="text-md text-gray-600 mb-6">Contact: 555-555-5555</h4>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={openModal}
                        >
                            View Photos
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4"
                            onClick={openWalkthrough}
                        >
                            View Walkthrough
                        </button>
                    </div>
                </div>

                {/* Modal for photos */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full p-6">
                            <div className="flex flex-col items-center">
                                <h2 className="text-xl font-bold mb-4">Photos</h2>


                                <Image
                                    src={images[currentImageIndex]}
                                    alt={`Photo ${currentImageIndex + 1}`}
                                    className="rounded-lg w-full h-96 object-cover transition-opacity duration-300"
                                    width={800}
                                    height={500}
                                />


                                {/* Thumbnails */}
                                <div className="flex mt-4 space-x-2 overflow-x-auto">
                                    {images.map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-20 h-20 object-cover rounded cursor-pointer ${currentImageIndex === index ? 'border-4 border-blue-500' : ''}`}
                                            width={160}
                                            height={100}
                                            onClick={() => selectImage(index)}
                                        />
                                    ))}
                                </div>

                                {/* Carousel Navigation */}
                                <div className="flex justify-between w-full mt-4">
                                    <button
                                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                                        onClick={goToPrevious}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                                        onClick={goToNext}
                                    >
                                        Next
                                    </button>
                                </div>

                                {/* Close Button */}
                                <button
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isWalkthroughOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            className="bg-white rounded-lg overflow-hidden max-w-6xl w-full p-6 relative flex flex-col md:flex-row gap-4 min-h-96">
                            {/* Floor Plan Section */}
                            <div
                                className="flex-shrink-0 w-full md:w-1/2 relative bg-gray-200 rounded-lg overflow-hidden">
                                <h2 className="text-xl font-bold mb-4 text-center">Floor Plan</h2>
                                <Image
                                    src="/FP.jpg" // Replace with your floor plan image
                                    alt="Floor Plan"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                />
                                {locations.map((location) => (
                                    <button
                                        key={location.id}
                                        aria-label={`Go to ${location.name}`}
                                        className="absolute w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-600"
                                        style={{top: location.top, left: location.left}}
                                        onClick={() => handleNodeClick(location.src)}
                                    >
                                        {"O"}
                                    </button>
                                ))}
                            </div>

                            {/* 360 Viewer Section */}
                            <div className="flex-grow w-full md:w-1/2 flex flex-col items-center">
                                <h2 className="text-xl font-bold mb-4">360° View</h2>
                                <ReactPhotoSphereViewer
                                    src={current360Image}
                                    height="100%"
                                    width="100%"
                                />
                            </div>

                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                onClick={closeWalkthrough}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}