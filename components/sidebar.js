import React, { useEffect, useRef, useState } from 'react'
import { Switch } from '@chakra-ui/react'
const Sidebar = ({
    file,
    setFile,
    setTarget,
    productVisible,
    setProductVisible,
    setSketch,
    sketch,
    eraser,
    setEraser,
    lineWidth,
    setLineWidth,
    eraserWidth,
    setEraserWidth,
    lineColor,
    setLineColor
}) => {

    const [sketchOpen, setSketchOpen] = useState(false);

    const divRef = useRef();

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setSketchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {

    }, [])
    return (
        <div ref={divRef} className='flex flex-col text-white gap-4 py-8 min-w-[5rem] bg-[#18181a] items-center'>
            <p className=' cursor-pointer' onClick={() => (setProductVisible(!productVisible), setSketchOpen(false))} >product</p>
            <p className=' cursor-pointer'>props</p>
            <p className=' cursor-pointer' onClick={() => (setSketchOpen(!sketchOpen), setProductVisible(false))} >Sketch</p>

            {productVisible && <div className='absolute left-20 z-10 top-0 bg-[#18181a] border-l h-screen max-w-[20rem]'>
                <input type='file' className='text-center' multiple onChange={(e) => setFile((prev) => {
                    if (e.target.files.length == 1) {
                        return [...prev, URL.createObjectURL(e.target.files[0])]
                    } else {
                        let rm = [];
                        for (let i = 0; i < e.target.files.length; i++) {
                            rm.push(URL.createObjectURL(e.target.files[i]))
                        }
                        return [...prev, ...rm]
                    }
                })} />
                <div className='flex gap-2 justify-between px-2 flex-wrap'>
                    {file.length > 0 && file.map((db) => (
                        <div className='h-36 w-36' onClick={() => setTarget(db)}>
                            <img
                                alt="lion"
                                className='h-full w-[100%]'
                                src={db}
                            />
                        </div>
                    ))}
                </div>
            </div>}

            {sketchOpen && <div className='absolute left-20 z-10 top-0 bg-[#18181a] border-l h-screen min-w-[12rem] max-w-[20rem]'>
                <div className='flex flex-col gap-4 justify-center py-4 px-4'>
                    <div className='flex gap-4 items-center'>
                        <p>Pencil</p>
                        <Switch size='md' isChecked={sketch} onChange={() => { setSketch(!sketch), setEraser(false) }} />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label>Pencil Width</label>
                        <input type='range' min='0' max='30'
                            value={lineWidth}
                            onChange={(e) => setLineWidth(e.target.value)} />
                    </div>
                    <div>
                        <p className='mb-4'>Pencil Color</p>
                        <div className='flex items-center gap-3'>
                            <button
                                type='button'
                                className='group relative overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(34,37,71,0.15)] w-6 h-6 cursor-pointer multicolor'
                            >
                                <span className='absolute inset-0 bg-[rgba(34,37,71,0.15)] opacity-0 transition-opacity group-active:opacity-100'></span>
                                <input
                                    type='color'
                                    value={
                                       lineColor
                                    }
                                    onChange={(e) => {
                                       setLineColor(
                                            e.target
                                                .value
                                        );
                                    }}
                                    className=' absolute left-0 top-0 w-full cursor-pointer'
                                />
                            </button>
                            <button
                                type='button'
                                className='group relative border-white border overflow-hidden rounded-sm w-8 h-8 aspect-square cursor-pointer'
                                style={{
                                    backgroundColor:
                                       lineColor,
                                }}
                            >
                                <span className='absolute inset-0  bg-[rgba(34,37,71,0.15)] opacity-0 transition-opacity group-active:opacity-100'></span>
                            </button>
                           
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>Eraser</p>
                        <Switch size='md' isChecked={eraser} onChange={() => { setEraser(!eraser), setSketch(false) }} />
                    </div>
                <div className='flex flex-col gap-4'>
                    <label>Eraser Width</label>
                    <input type='range' min='0' max='30'
                        value={eraserWidth}
                        onChange={(e) => setEraserWidth(e.target.value)} />
                </div>
                </div>

            </div>}
        </div>
    )
}

export default Sidebar