"use client"; 
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const Draw = ({ target,  setProductVisible, sketch, eraser, lineColor,lineWidth, eraserWidth }) => {
    const [canvas, setCanvas] = useState ();

    let width = window?.innerWidth;
    let height = window?.innerHeight;
    let clip;
    const [clips, setClips] = useState();

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
            isDrawingMode: false,
            freeDrawingBrush: true
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
            erasable: false
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
            if (sketch) {      
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
            if (eraser) {
                canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush.width = parseInt(eraserWidth, 10)
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
                    var scale = 0.3;
                    const canvasWidth = clips.width;
                    const canvasHeight = clips.height;
                    img.set({
                        left: canvas._offset.left + (canvas.width * (1 - scale)) / 2,
                        top: canvas._offset.top + (canvas.height * (1 - scale)) / 2,
                        cors: 'anonymous',
                    })
                    img.scaleToWidth(canvasWidth * 0.75);
                    img.scaleToHeight(canvasHeight * 0.75);
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
            height:clips.height,
            left: clips.left,
            top: clips.top,
            quality: 1 
        });

        let blob = dataURLtoBlob(dataURL);
        const rm = await getBase64(blob);
        console.log({'blob':rm})
   }


    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    return (
        <div className="relative">
            <canvas id="canvas" />
            <button className="absolute top-4 left-4 text-white" onClick={()=>handleBlob()}>BLOB</button>
        </div>
    );
};

export default Draw;