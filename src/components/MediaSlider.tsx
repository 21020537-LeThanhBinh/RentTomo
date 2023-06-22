import Image from "next/image";
import { use, useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

interface ImageSliderProps {
	images: string[];
	index: number
	fullView: boolean
	onClose?: () => void
}

const MediaSlider = ({ images, index, fullView, onClose }: ImageSliderProps) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(index);
	const [nextImageIndex, setNextImageIndex] = useState(index);

	const setIndex = (index: number) => {
		setNextImageIndex(index);
		setTimeout(() => {
			setCurrentImageIndex(index);
		}, 300);
	}

	useEffect(() => {
		setIndex(index);
	}, [index])
	
	const handlePrevious = (e: any) => {
		e.stopPropagation();
		if (currentImageIndex === 0) {
			setIndex(images.length - 1);
		} else {
			setIndex(currentImageIndex + 1);
		}
	};

	const handleNext = (e: any) => {
		e.stopPropagation();
		if (currentImageIndex === images.length - 1) {
			setIndex(0);
		} else {
			setIndex(currentImageIndex + 1);
		}
	};

	return (
		<div className="relative w-full h-full flex justify-center items-center">
			<Image
				fill
				draggable="false"
				src={images[currentImageIndex]}
				alt={"Listing Image"}
				className={`
					object-contain object-center rounded-2xl select-none
					${fullView ? "min-h-[615px]" : "h-[275px] cursor-pointer"}
					transition-opacity duration-300 ease-in-out
					${currentImageIndex != nextImageIndex ? "opacity-0" : "opacity-100"}
				`}
			/>

			<div className="absolute inset-0 flex">
				<button
					onClick={handlePrevious}
					className={`
					 	rounded-full flex items-center justify-start flex-1 h-full pl-2 select-none focus:outline-none
					`}
				>
					<BsFillArrowLeftCircleFill size={32} className="fill-neutral-800" />
				</button>

				<button
					onClick={handleNext}
					className={`
					 	rounded-full flex items-center justify-end flex-1 h-full pr-2 select-none focus:outline-none
					`}
				>
					<BsFillArrowRightCircleFill size={32} className="fill-neutral-800" />
				</button>
			</div>

			<button onClick={onClose} className="absolute top-2 right-2 focus:outline-none">
				<AiFillCloseCircle size={32} className="fill-neutral-800" />
			</button>
		</div>
	);
};

export default MediaSlider;
