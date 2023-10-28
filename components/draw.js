"use client"; 
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const Draw = () => {
    const [canvas, setCanvas] = useState ();

    let width = 500;
    let height = 500;
    function updateSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        console.log(width,height)
    }
    const canva = {
        width: 500,
        height: 500,
        left: 200,
        top: 200
    };
    useEffect(() => {
        updateSize();
        window.addEventListener('resize', (e) => {
            updateSize();
        })
        const c = new fabric.Canvas("canvas", {
            height:height,
            width:width,
            backgroundColor: "black",
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
                top:height/3,
                fill: "#FFFFFF",
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

    return (
        <div className="relative">
            <canvas id="canvas" />
            <button className="text-white absolute left-4 top-4" onClick={() => addRect(canvas)}>Rectangle</button>
        </div>
    );
};

export default Draw;