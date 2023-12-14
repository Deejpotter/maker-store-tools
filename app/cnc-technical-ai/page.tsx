"use client";
import React, { useState } from "react";
import ChatInterface from "@/components/ChatInterface";

const CncTechnicalAI = () => {
	const [showConversations, setShowConversations] = useState(false);

	return (
		<ChatInterface
			setShowConversations={setShowConversations}
			showConversations={showConversations}
		/>
	);
};

export default CncTechnicalAI;
