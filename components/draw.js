"use client"; 
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const Draw = ({ target,  setProductVisible }) => {
    const [canvas, setCanvas] = useState ();

    let width = window?.innerWidth;
    let height = window?.innerHeight;

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
            fireRightClick: true
        });

        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = "#2BEBC8";
        fabric.Object.prototype.cornerStyle = "rect";
        fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
        fabric.Object.prototype.cornerSize = 6;
        c.add(
            new fabric.Rect({
                width: width/3,
                height: height/2,
                left: width/3,
                top:height/3.5,
                stroke: "#fae27a",
                fill:"#1d1d20",
                selectable: false
            })
        );
        setCanvas(c);

        return () => {
            c.dispose();
        };
    }, []);

    const addRect = (canvas) => {
        const rect = new fabric.Rect({
            height: 300,
            width: 200,
            stroke: "#2BEBC8",
            fill:"#ff0000"
        });
        canvas?.add(rect);
        canvas?.requestRenderAll();
    };

    useEffect(() => {
        if (canvas) {
            
            fabric.Image.fromURL(
                target,
                function (img) {
                    var scale = 0.2;
                    img.set({
                        left: canvas._offset.left + (canvas.width * (1 - scale)) / 2,
                        top: canvas._offset.top + (canvas.height * (1 - scale)) / 2,
                        scaleX: (scale * canvas.width) / img.width,
                        scaleY: (scale * canvas.height) / img.height
                    });
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
    },[target])

    return (
        <div className="relative">
            <canvas id="canvas" />
            <button className="text-white absolute left-4 top-4" onClick={() => addRect(canvas)}>Rectangle</button>
        </div>
    );
};

export default Draw;