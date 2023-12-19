import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadArea = () => {
	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		const formData = new FormData();
		formData.append("file", file);

		fetch("/api/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} className="upload-area">
			<input {...getInputProps()} />
			<p>Drag drop a CSV file here, or click to select one</p>
		</div>
	);
};
