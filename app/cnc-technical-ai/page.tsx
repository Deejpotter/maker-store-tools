"use client";
import React, { useMemo } from "react";
import { AiChat } from "@nlux/react";
import { Adapter, StreamingAdapterObserver } from "@nlux/core";
import "@nlux/themes/nova.css";

const apiUrl = process.env.REACT_APP_API_URL || "";

/**
 * Custom stream adapter for the my custom backend API to be used with the NLux AI Chat component.
 */
export const CustomAdapter: Adapter = {
	streamText: (message: string, observer: StreamingAdapterObserver): void => {
		const socket = new WebSocket("ws://localhost:8080");

		// We register listeners for the WebSocket events here
		// and call the observer methods accordingly
		socket.onmessage = (event) => observer.next(event.data);
		socket.onclose = () => observer.complete();
		socket.onerror = (event) => {
			// Create an Error object with a custom message or details from the event
			const error = new Error("WebSocket error occurred");
			observer.error(error);
		};

		// This is where we send the user message to the API
		socket.send(message);
	},
	async fetchText(userInput): Promise<string> {
		const response = await fetch(apiUrl + "/ask", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_message: userInput }),
		});

		const data = await response.json();
		return data.bot_message;
	},
};

/**
 * Functional component for CNC Technical AI.
 */
const CncTechnicalAI = () => {

	const adapter = useMemo(() => CustomAdapter, []);
	return <AiChat adapter={adapter} />;
};

export default CncTechnicalAI;
