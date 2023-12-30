import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
    const fileRef = useRef(null);

    const { currentUser } = useSelector((state) => state.user);

    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});

    // firebase storage
    // allow read;
    // allow write: if
    // request.resource.size < 2*1024*1024 &&
    // request.resource.contentType.matches('image/.*')

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        // console.log(fileName);
        const storageRef = ref(storage, fileName);
        // uploadTask is used to get the percentage of upload done and some error if any
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                setFilePercentage(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            }
        );
    };

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    return (
        <div className="p-3 max-w-lg mx-auto">
            {/* Resize an element’s content to cover its container using object-cover */}
            <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                {/* for images, we use self-center to center them */}
                <input
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                />
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt="profile-image"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <p className="text-sm text-center">
                    {fileUploadError ? (
                        <span className="text-red-700">
                            Error uploading the Image (image must be less than 2MB)
                        </span>
                    ) : (filePercentage > 0 && filePercentage < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
                    ) : ( filePercentage === 100 ? ( <span className="text-green-700">Image uploaded successfully!</span> ) : "")
                    )}
                </p>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="border p-3 rounded-lg"
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                />
                <button className="bg-slate-700 uppercase text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
