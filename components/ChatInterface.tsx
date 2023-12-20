"use client";
// Import necessary modules from React and custom CSS
import React, {
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
} from "react";
import "@/styles/ChatInterface.scss"; // Import custom CSS
import ChatMessage from "./ChatMessage"; // Import ChatMessage component
import ConversationsList from "./ConversationsList"; // Import the new ConversationsList component
import FileUpload from "./FileUpload";

// The chat interface component receives setShowConversations and showConversations as props
export type ChatInterfaceProps = {
	setShowConversations: Dispatch<SetStateAction<boolean>>;
	showConversations: boolean;
};

// Define the ChatInterface component as a functional component
const ChatInterface: React.FC<ChatInterfaceProps> = ({
	setShowConversations,
	showConversations,
}) => {
	// Get API URL from environment variable. If not set, use an empty string which will try to access the same domain.
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
	// State to hold all chat messages
	const [messages, setMessages] = useState<
		Array<{ type: "user" | "bot"; content: string }>
	>([]);
	// Reference for auto-scrolling
	const messagesEndRef = useRef(null);
	// Auto-scroll when a new message is added
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Function to handle form submission
	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// Prevent default form submission behavior
		event.preventDefault();
		// Get the user input element as an HTMLInputElement
		const inputElement = event.currentTarget.elements.namedItem(
			"user-input"
		) as HTMLInputElement;
		// Get the value of the user input
		const userInput = inputElement.value;
		// Clear the user input
		inputElement.value = "";
		// Add the user's message to the messages state.
		// Use the spread operator to preserve the previous messages then add the new message with the user input and 'user' type.
		setMessages((prevMessages) => [
			...prevMessages,
			{ type: "user", content: `You: ${userInput}` },
		]);

		// Try to fetch the bot's response and catch any errors.
		try {
			// Send a POST request to the /ask endpoint with the user's message. The back end should respond with the bot's response which we will add to the messages state.
			const response = await fetch(`${apiUrl}/ask`, {
				method: "POST",
				// Need to set the Content-Type header to JSON since we are sending JSON
				headers: { "Content-Type": "application/json" },
				// and use JSON.stringify to convert the object to a JSON string for the body of the request.
				body: JSON.stringify({ user_message: userInput }),
			});

			// If we get a successful response, add the bot's response to the messages state
			if (response.ok) {
				// Use await to get the JSON data from the response once the promise resolves.
				const data = await response.json();
				// Then add the bot's response to the messages state by using the spread operator to preserve the previous messages then add the new message with the bot's response and 'bot' type.
				setMessages((prevMessages) => [
					...prevMessages,
					{ type: "bot", content: `Bot: ${data.bot_response}` },
				]);
			}

			// If we get an error, log it to the console and end the function.
		} catch (error) {
			console.error("Failed to fetch bot response", error);
		}
	};

	// Function to handle reinitialization
	const handleReinitializeClick = async () => {
		try {
			const response = await fetch(`${apiUrl}/reinitialize`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				alert("QA Collection reinitialized successfully.");
			} else {
				alert("Failed to reinitialize QA Collection.");
			}
		} catch (error) {
			console.error("Error reinitializing QA Collection", error);
		}
	};

	// The interface is made up of a container with two columns. The left column contains the conversations list and the right column contains the chat area.
	// The chat area is made up of a chat container which contains the message container and the chat form.
	// The message container is where the messages are displayed and the chat form is where the user can type and submit a message.
	// Everything uses flexbox to make it responsive.
	// For example, the chat container is set to flex - grow - 1 so it will take up all the available space in the column.
	// The message container is set to overflow-auto so it will scroll when it overflows.
	// The chat form is set to flex-shrink-0 so it will not shrink when the window is resized.
	return (
		<div
			className="container d-flex flex-column"
			// Set the height of the container to 90vh so it will take up 90% of the viewport height.
			style={{ height: "90vh" }}
		>
			<div className="row flex-grow-1">
				{/* Sidebar */}
				<div
					className={`col-md-3 border-right p-3 collapse ${
						showConversations ? "show" : "d-md-block"
					}`}
					id="conversation-list"
				>
					<ConversationsList />

					{/* Reinitialize Button */}
					<div className="mt-3 d-flex justify-content-center">
						<button
							type="button"
							className="btn btn-warning"
							onClick={handleReinitializeClick}
						>
							Reinitialize QA Collection
						</button>
					</div>

					{/* File upload area */}
					<FileUpload uploadEndpoint={apiUrl + '/upload'} />
				</div>

				{/* Chat area */}
				<div className="col-md p-3 d-flex flex-column">
					{/* Chat container */}
					<div
						className="border rounded p-3 flex-grow-1 d-flex flex-column"
						id="chat-container"
					>
						{/* Message container */}
						<div className="flex-grow-1 overflow-auto" id="message-container">
							{messages.map((message, index) => (
								<ChatMessage
									key={index}
									type={message.type}
									message={message.content}
								/>
							))}

							{/* Scroll anchor */}
							<div ref={messagesEndRef}></div>
						</div>

						{/* Chat form */}
						<form
							className="form-inline bg-white p-2"
							id="chat-form"
							onSubmit={handleFormSubmit}
						>
							<input
								type="text"
								className="form-control mr-2 flex-grow-1"
								name="user-input"
								placeholder="Type your message..."
							/>
							<button type="submit" className="btn btn-primary">
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

// Set default export for this component to make it easier to import into other files
export default ChatInterface;
