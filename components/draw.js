"use client"; 
import React, { useEffect } from "react";
import { fabric } from "fabric";

const Draw = ({
    target,
    setProductVisible,
    sketch,
    eraser,
    lineColor,
    lineWidth,
    eraserWidth,
    canvas,
    setCanvas,
    clips,
    setClips
}) => {

    let width = window?.innerWidth;
    let height = window?.innerHeight;
    let clip;

    function updateSize() {
        const windowWidth = window.innerWidth;
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        width = windowWidth - 5 * remSize;
        height = window.innerHeight;
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


   

    return (
        <div className="relative">
            <canvas id="canvas" />
        </div>
    );
};

export default Draw;