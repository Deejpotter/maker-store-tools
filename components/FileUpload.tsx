import { useDropzone } from "react-dropzone";

const FileUpload = ({ uploadEndpoint }) => {
	const handleUpload = async (file) => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch(uploadEndpoint, {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				alert("File uploaded successfully.");
			} else {
				alert("Failed to upload file.");
			}
		} catch (error) {
			console.error("Error uploading file", error);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => handleUpload(acceptedFiles[0]),
	});

	return (
		<div
			{...getRootProps()}
			style={{ border: "1px dashed #ccc", padding: "20px", cursor: "pointer" }}
		>
			<input {...getInputProps()} />
			<p>Drag and drop a file here, or click to select a file</p>
		</div>
	);
};

export default FileUpload;
