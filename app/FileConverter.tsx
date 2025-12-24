"use client"

import { useState } from "react";

export default function FileConverter(){


    function handleUpload (e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const SIZE = 40;
                canvas.width = SIZE;
                canvas.height = SIZE;

                // Draw and resize image
                ctx.drawImage(img, 0, 0, SIZE, SIZE);

                // Convert to compressed base64
                const base64 = canvas.toDataURL("image/jpeg", 0.7); // quality 0–1

                const image = document.querySelector("img");
                if(image) image.src = base64;
            };
        };

        reader.readAsDataURL(file);
    }

    return (
        <div className="">
            <input
                type="file"
                accept={".png, .jpeg, .jpg"}
                onChange={handleUpload}
            />

            <img src={undefined} alt="" />
        </div>
    )
}