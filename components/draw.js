"use client"; 
import React, { useEffect } from "react";
import { fabric } from "fabric";

const Draw = ({
    target,
    targetApi,
    setProductVisible,
    sketch,
    eraser,
    lineColor,
    lineWidth,
    eraserWidth,
    canvas,
    setCanvas,
    clips,
    setClips,
    zoomValue,
    setZoomValue
}) => {

    let width = window?.innerWidth;
    let height = window?.innerHeight;
    let clip;

    function updateSize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        width = windowWidth - 5 * remSize;
        height = windowHeight - 2 * remSize;
    }



    useEffect(() => {
        updateSize();
        window.addEventListener('resize', (e) => {
            updateSize();
        })
        const c = new fabric.Canvas("canvas", {
            height:height,
            width:width,
            backgroundColor: "#1d1d20",
            stopContextMenu: true,
            fireRightClick: true,
        });

        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = "#2BEBC8";
        fabric.Object.prototype.cornerStyle = "rect";
        fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
        fabric.Object.prototype.cornerSize = 6;

        clip = new fabric.Rect({
            width: width / 3,
            height: height / 2,
            left: width / 3,
            top: height / 3.5,
            stroke: "#fae27a",
            fill: "#1d1d20",
            selectable: false,
            erasable: false,
            mask:true
        })
        setClips(clip)
        c.add(clip);

        setCanvas(c);

        return () => {
            window.removeEventListener('resize', (e) => {
                updateSize();
            })
        };
    }, []);




    useEffect(() => {
        if (canvas) {
            if (sketch && !canvas.isDrawingMode) {      
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                canvas.isDrawingMode = sketch;
                canvas.freeDrawingBrush.color = lineColor;
                canvas.freeDrawingBrush.width = lineWidth;
            }
            else {
                    canvas.freeDrawingBrush = null;
                    canvas.isDrawingMode = false;
                  }
        }
    }, [sketch])
    


    useEffect(() => {
        if (canvas) {
            if (eraser && !canvas.isDrawingMode) {
                canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
                canvas.isDrawingMode = eraser;
                canvas.freeDrawingBrush.width = parseInt(eraserWidth, 10)
            } else {
                canvas.freeDrawingBrush = null;
                canvas.isDrawingMode = false;
            }
        } 
    }, [eraser])

    useEffect(() => {
        if (canvas && canvas.isDrawingMode) {
            canvas.freeDrawingBrush.width = parseInt(lineWidth, 10)
            canvas.freeDrawingBrush.color = lineColor
        }
    }, [lineColor, lineWidth])
    

    useEffect(() => {
        if (canvas && canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = eraserWidth
        }
    },[eraserWidth])



    useEffect(() => {
        if (canvas) {
            fabric.Image.fromURL(
                target,
                function (img) {
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    img.set({
                        left:  0,
                        top: 0,
                        cors: 'anonymous',
                        mask:false
                    })
                    img.scaleToWidth(clips.width * 0.75);
                    img.scaleToHeight(clips.height * 0.75);
                    img.left = (canvas.width - img.getScaledWidth()) / 2;
                    img.top = (canvas.height - img.getScaledHeight()) / 2 + 40 ;
                    canvas.add(img);
                    canvas?.requestRenderAll();
                    console.log(canvas._offset)
                },
                {
                    crossOrigin: "anonymous"
                }
            );
            setProductVisible(false)
        }
    }, [target])
    useEffect(() => {
        if (canvas) {
            fabric.Image.fromURL(
                targetApi,
                function (img) {
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    img.set({
                        left:  0,
                        top: 0,
                        cors: 'anonymous',
                        mask:false
                    })
                    img.scaleToWidth(clips.width * 0.75);
                    img.scaleToHeight(clips.height * 0.75);
                    img.left = canvasWidth - img.width;
                    img.top = canvasHeight/3;
                    canvas.add(img);
                    canvas?.requestRenderAll();
                    console.log(canvas._offset)
                },
                {
                    crossOrigin: "anonymous"
                }
            );
            setProductVisible(false)
        }
    }, [targetApi])

    function deleteObject() {
        const activeObject = canvas.getActiveObject();
        const activeObjects = canvas.getActiveObjects();

        if (!activeObject) return;
        if (activeObjects.length > 1) {
            canvas.remove(activeObjects);
        } else {
            canvas.remove(activeObject);
        }
        canvas.requestRenderAll();
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check if the delete key was pressed
            const activeElement = document.activeElement;
            //console.log('Active element tag name : ', activeElement.tagName)
            if (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA'
            )
                return;
            if (event.key === 'Delete' || event.key === 'Backspace') {
                // Call the deleteObject function here
                //Need to check if focus is on Canvas or not
                canvas.getActiveObject() && deleteObject(event);
            }
        };

        // Add a keydown event listener to the window object
        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [deleteObject]);


    useEffect(() => {
        if (canvas) {
            canvas.on('mouse:wheel', function (opt) {
                var evt = opt.e;

                let isDragging = false;
                if (evt.ctrlKey === true) {
                    isDragging = true;
                }
                if (isDragging) {     
                    var delta = opt.e.deltaY;
                    var zoom = canvas.getZoom();
                    zoom *= 0.999 ** delta;
                    if (zoom < 0.25) {
                        zoom = 0.25
                    }
                    if (zoom > 1.5) {
                        zoom = 1.5
                    }
                    // zoom = 0.25
                    console.log(zoom)
                    setZoomValue(zoom)
                    if (zoom > 20) zoom = 20;
                    if (zoom < 0.01) zoom = 0.01;
                    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                    opt.e.preventDefault();
                    opt.e.stopPropagation();
                }
            });

        }
    }, [canvas])

    useEffect(() => {
        if (canvas) {
            let wheel = true;
            document.addEventListener('wheel', () => {
                wheel = false
            })
            if (wheel) {
                if(zoomValue < 0.25)return
                if(zoomValue > 1.5)return
                canvas.zoomToPoint({ x: clips.getCenterPoint().x, y: clips.getCenterPoint().y }, zoomValue);
            }

            
        }
    },[zoomValue])
   

    return (
        <div className="relative">
            <canvas id="canvas" />
        </div>
    );
};

export default Draw;