import React, {useState, useEffect, useRef} from "react"
import './index.css'

/* --------------------------------
    Types and Interfaces
-------------------------------- */

interface CrouselPropsType {
    config?: {
        height?: number
        width?: number
        unit?: "px"
    } 
    images: ImageType[]
    onSlideChange?: (slideOldIndex: number, slideNewIndex: number) => void
}

interface ImageType {
    url: string
    description: string
    "web-destination"?: string
}

type ControlButtonsType = {
    nbtnClickHandler: React.MouseEventHandler<HTMLButtonElement>,
    pbtnClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

/* --------------------------------
    Dependent components
-------------------------------- */

const SlideImage: React.FunctionComponent<{image: ImageType}> = (props) => {
    return (
        <img src={props.image.url} alt={props.image.description} />
    )
}

const SlideWithWebDestination: React.FunctionComponent<{image: ImageType}> = (props: {image: ImageType}) => {
    return (
        <a href={props.image["web-destination"]}>
            <SlideImage image={props.image} />
        </a>
    )
}

const Slide = (props: {image: ImageType, index: number, slideIndex?: number}) => {
    const {image, index, slideIndex = 0} = props
    if(props.image["web-destination"]) {
        return (<div className="crousel-item" style={{transform: `translateX(${(index-slideIndex) * 100}%)`}}><SlideWithWebDestination image={image} /></div>)
    }
    return (<div className="crousel-item" style={{transform: `translateX(${(index-slideIndex) * 100}%)`}}><img src={image.url} alt={image.description} /></div>)
}

/* --------------------------------
    Main component
-------------------------------- */

const ControlButtons = (props: ControlButtonsType) => {
    return (
        <>
            <button className="btn btn-prev" onClick={props.pbtnClickHandler}>&lt;</button>
            <button className="btn btn-next" onClick={props.nbtnClickHandler}>&gt;</button>
        </>
    )
}

const Crousel = ({images, onSlideChange}: CrouselPropsType) => {
    const [slideIndex, setSlideIndex] = useState(0)
    const oldSlideIndex = useRef(slideIndex)
    const nextButtonClick = () => {
        if(slideIndex === images.length - 1) {
            setSlideIndex(0)
        } else {
            setSlideIndex(slideIndex + 1)
        }
    }

    const prevButtonClick = () => {
        if(slideIndex === 0) {
            setSlideIndex(images.length - 1)
        } else {
            setSlideIndex(slideIndex - 1)
        }
        
    }

    useEffect(() => {
        if(onSlideChange) {
            onSlideChange(oldSlideIndex.current, slideIndex)
        }
        oldSlideIndex.current = slideIndex
    }, [slideIndex])


    const customStyles = {}

    const output = (
        <>
            <ControlButtons nbtnClickHandler={nextButtonClick} pbtnClickHandler={prevButtonClick}></ControlButtons>
            <div>
                {
                    images.map((image, index) => {
                        return (<Slide image={image} index={index} slideIndex={slideIndex} key={index}/>)
                    })
                }
            </div>
        </>
    )
    return output
}

export default Crousel