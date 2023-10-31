import React, { useEffect, useRef, useState } from 'react'
import { Switch } from '@chakra-ui/react'
import { fabric } from "fabric";

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
    setLineColor,
    canvas,
    clips
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

    const hitAPI = async () => {
        try {
            console.log('Sending API req');
            const response = await fetch('/api/hello', {
                method:'POST',
            headers:{
                "Content-Type" :"application/json",

            },
            body:JSON.stringify({msg:"dummy message"})
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            
        }
    }

    function dataURLtoBlob(dataURL) {
        var byteString = atob(dataURL.split(',')[1]);
        var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    async function handleBlob() {

        let dataURL = canvas.toDataURL({
            format: 'png',
            width: clips.width,
            height: clips.height,
            left: clips.left,
            top: clips.top,
            quality: 1
        });

        let blob = dataURLtoBlob(dataURL);
        const rm = await getBase64(blob);
        console.log({ 'blob': rm })
    }


    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }


    function generateProductWithInvertMaskBase64() {
        let productWithInvertMaskCanvas = new fabric.Canvas();
        productWithInvertMaskCanvas.setDimensions({
            width:clips.width,
            height: clips.height,
        });

        canvas.forEachObject(function (obj) {
            var objBound = obj.getBoundingRect();
            if (!(objBound.left > clips.left + clips.width ||
                objBound.left + objBound.width < clips.left ||
                objBound.top > clips.top + clips.height ||
                objBound.top + objBound.height < clips.top)) {
              
                if (!obj.mask) {
                    const image = fabric.util.object.clone(obj);
                    productWithInvertMaskCanvas.add(image);
                }
                else {
                    // obj.clone(function (mask) {
                    //     productWithInvertMaskCanvas.add(mask);
                    // });
                }
                
            }
        });

        var productWithInvertMaskDataURL =
            productWithInvertMaskCanvas.toDataURL({
                format: 'png',
                width: clips.width,
                height: clips.height,
                left: clips.left,
                top: clips.top,
                quality: 1
            });
        return productWithInvertMaskDataURL;
    }

    function generateProductBase64() {
        let productCanvas = new fabric.Canvas();
        productCanvas.setDimensions({
            width: clips.width,
            height: clips.height,
        });


        canvas.forEachObject(function (obj) {

            var objBound = obj.getBoundingRect();
            if (!(objBound.left > clips.left + clips.width ||
                objBound.left + objBound.width < clips.left ||
                objBound.top > clips.top + clips.height ||
                objBound.top + objBound.height < clips.top)) {
                console.log(obj)
                 if(obj.type == 'path')
				return;
			if (!obj.mask) {
				const image = fabric.util.object.clone(obj);
				productCanvas.add(image);
			}
            }
        });


        var productDataURL = productCanvas.toDataURL({
            format: 'png',
            width: clips.width,
            height: clips.height,
            left: clips.left,
            top: clips.top,
            quality: 1
});
        console.log({productDataURL})
        return productDataURL;
    }

    // function generateMaskBase64() {
    //     var maskCanvas = new fabric.Canvas();
    //     maskCanvas.setDimensions({
    //         width: clips.width,
    //         height: clips.height,
    //     });
    //     maskCanvas.backgroundColor = 'black';

    //     let flag = false;
    //     canvas.forEachObject(function (obj) {
    //         var objBound = obj.getBoundingRect();
    //         if (!(objBound.left > clips.left + clips.width ||
    //             objBound.left + objBound.width < clips.left ||
    //             objBound.top > clips.top + clips.height ||
    //             objBound.top + objBound.height < clips.top)) {
    //             obj.clone(function (mask) {
    //                 mask.forEachObject(function (path) {
    //                     path.set({
    //                         stroke: '#FFFFFF',
    //                         fill: '#FFFFFF',
    //                         dirty: true,
    //                     });
    //                 });
    //                 maskCanvas.renderAll();
    //                 maskCanvas.add(mask);
    //             });
    //         }
    //     });

    //     var maskDataURL = maskCanvas.toDataURL();
    //     return { maskDataURL };
    // }

    async function generateInverseMaskBase64() {
        const inverseMaskCanvas = new fabric.Canvas();
        inverseMaskCanvas.setDimensions({
            width: clips.width,
            height: clips.height,
        });
        inverseMaskCanvas.backgroundColor = 'white';

        return new Promise((resolve) => {
            const promises = [];

            canvas.forEachObject(function (obj) {

                        let objBound = obj.getBoundingRect();
                if (!(objBound.left > clips.left + clips.width ||
                    objBound.left + objBound.width < clips.left ||
                    objBound.top > clips.top + clips.height ||
                    objBound.top + objBound.height < clips.top)) {
                    // if (obj.type == 'line' || obj.type == 'path') return;

                    if (obj.mask) {
                        // const promise = new Promise((resolve) => {
                        //     obj.clone(function (mask) {
                        //         mask.forEachObject(function (path) {
                        //             path.set({
                        //                 stroke: '#FFFFFF',
                        //                 fill: '#FFFFFF',
                        //                 dirty: true,
                        //             });
                        //         });
                        //         inverseMaskCanvas.add(mask);
                        //         resolve();
                        //     });
                        // });
                        // promises.push(promise);
                    } else {
                        const image = fabric.util.object.clone(obj);

                        const top = image.top,
                            left = image.left,
                            height = image.getScaledHeight(),
                            width = image.getScaledWidth();

                        image.left = (-1 * width) / 2;
                        image.top = (-1 * height) / 2;
                        image.angle = 0;

                        const inverse = new fabric.Rect({
                            fill: 'black',
                            top: top,
                            left: left,
                            height: height,
                            width: width,
                            angle: obj.angle,
                            clipPath: image,
                        });

                        inverseMaskCanvas.add(inverse);
                    }
                }
            });
            inverseMaskCanvas.renderAll();
            // Wait for all promises to resolve before generating data URL
            Promise.all(promises).then(() => {
                // Delay the rendering process by a short time to ensure all objects are fully rendered on the canvas
                inverseMaskCanvas.renderAll();
                setTimeout(() => {
                    const inverseMaskDataURL = inverseMaskCanvas.toDataURL({
                        format: 'png',
                        width: clips.width,
                        height: clips.height,
                        left: clips.left,
                        top: clips.top,
                        quality: 1
                    });
                    resolve(inverseMaskDataURL);
                }, 100); // You can adjust the delay time based on your requirements
            });
            inverseMaskCanvas.renderAll();
        });
    }


    async function handleConvert() {
        console.log('Handling convert');
        const withoutbgBase64 = generateProductWithInvertMaskBase64();
        const productBase64 = generateProductBase64();
        // const { maskbase64 } = generateMaskBase64();
        const inverseMaskBase64 = await generateInverseMaskBase64();
        // const color = isColored();
        console.log({ withoutbgBase64, productBase64, inverseMaskBase64 }) ;
      
    }
    return (
        <div ref={divRef} className='flex flex-col text-white gap-4 py-8 min-w-[5rem] bg-[#18181a] items-center'>
            <p className=' cursor-pointer' onClick={() => (setProductVisible(!productVisible), setSketchOpen(false))} >product</p>
            <p className=' cursor-pointer'>props</p>
            <p className=' cursor-pointer' onClick={() => (setSketchOpen(!sketchOpen), setProductVisible(false))} >Sketch</p>

            {productVisible && <div className='absolute left-20 z-10 top-0 bg-[#18181a] border-l h-screen max-w-[22rem]'>
                <input type='file' className='text-center mx-4 mt-2' multiple onChange={(e) => setFile((prev) => {
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
                <div className='flex gap-2 justify-between px-2 flex-wrap mt-4'>
                    {file.length > 0 && file.map((db) => (
                        <div className='h-44 w-40 cursor-pointer border rounded-lg overflow-hidden' onClick={() => setTarget(db)}>
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
                        <Switch size='md' isChecked={sketch} onChange={() => { setSketch(!sketch); setEraser(false) }} />
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
                        <Switch size='md' isChecked={eraser} onChange={() => { setEraser(!eraser); setSketch(false) }} />
                    </div>
                <div className='flex flex-col gap-4'>
                    <label>Eraser Width</label>
                    <input type='range' min='0' max='30'
                        value={eraserWidth}
                        onChange={(e) => setEraserWidth(e.target.value)} />
                </div>
                </div>

            </div>}
            <button type='button' className='bg-yellow-500 p-2 text-black rounded-lg cursor-pointer ' onClick={handleConvert} >Blob</button>
        </div>


        
    )
}

export default Sidebar