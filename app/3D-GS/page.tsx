'use client'
import { SetStateAction, useState} from 'react';
import Image from 'next/image';

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [is3DgsOpen, setIs3DgsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const images = [
        "https://via.placeholder.com/800x500?text=Photo+1",
        "https://via.placeholder.com/800x500?text=Photo+2",
        "https://via.placeholder.com/800x500?text=Photo+3",
        "https://via.placeholder.com/800x500?text=Photo+4",
        "https://via.placeholder.com/800x500?text=Photo+5",
        "https://via.placeholder.com/800x500?text=Photo+6",
        "https://via.placeholder.com/800x500?text=Photo+7",
        "https://via.placeholder.com/800x500?text=Photo+8",
        "https://via.placeholder.com/800x500?text=Photo+9",
        "https://via.placeholder.com/800x500?text=Photo+10",
        "https://via.placeholder.com/800x500?text=Photo+11",
        "https://via.placeholder.com/800x500?text=Photo+12",
        "https://via.placeholder.com/800x500?text=Photo+13",
        "https://via.placeholder.com/800x500?text=Photo+14",
        "https://via.placeholder.com/800x500?text=Photo+15",
        "https://via.placeholder.com/800x500?text=Photo+16",
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
        setIsLoading(true); // Show loading initially
    };

    const closeModal = () => setIsModalOpen(false);

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsLoading(true);
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsLoading(true);
    };

    const selectImage = (index: SetStateAction<number>) => {
        if (index !== currentImageIndex) {
            setCurrentImageIndex(index);
            setIsLoading(true);
        }
    };


    const handleImageLoad = () => setIsLoading(false);

    const open3DGS = () => setIs3DgsOpen(true);
    const close3DGS = () => setIs3DgsOpen(false);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8 mt-32">
            <div className={"flex flex-wrap w-full lg:w-1/2 md:w-1/2 xl:w-full p-2"}>
                {imgs.map((image, index) => (
                    <div key={index} className={"flex-grow"}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                            src={image}
                            alt={`Photo ${index + 1}`}
                            width={800}
                            height={500}
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
                        onClick={open3DGS}
                    >
                        View 3D Recreation of Property
                    </button>
                </div>
            </div>

            {/* Modal for photos */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full p-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-4">Photos</h2>

                            {/* Loading Placeholder */}
                            {isLoading && (
                                <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                                    <span className="text-gray-500">Loading image...</span>
                                </div>
                            )}

                            {/* Carousel Image */}
                            <Image
                                src={images[currentImageIndex]}
                                alt={`Photo ${currentImageIndex + 1}`}
                                className={`rounded-lg w-full h-96 object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                                onLoad={handleImageLoad}
                                width={800}
                                height={500}
                                style={{ display: isLoading ? 'none' : 'block' }} // Hide until loaded
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

            {is3DgsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full p-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-4">3D-GS</h2>

                            <p>Unimplemented Feature (DNE)</p>

                            <button
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                onClick={close3DGS}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}